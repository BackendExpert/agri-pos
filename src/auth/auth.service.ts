import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuditLog, AuditLogDocument } from "src/auditlogs/schema/auditlog.model";
import { EmailService } from "src/common/emails/email.service";
import { Role, RoleDocument } from "src/role/schema/role.schema";
import { User, UserDocument, AccountStatus } from "src/users/schema/user.schema";
import { RegistationDTO } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { AuditLogService, CreateAuditLogInput } from "src/auditlogs/auditlog.service";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { LoginDTO } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,

        @InjectModel(Role.name)
        private readonly roleModel: Model<RoleDocument>,

        @InjectModel(AuditLog.name)
        private readonly auditlogModel: Model<AuditLogDocument>,

        private readonly emailService: EmailService,
        private readonly jwtService: JwtService,
        private readonly auditlogService: AuditLogService,

    ) { }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12)
    }

    private async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    private genarteToken(): string {
        return crypto.randomBytes(32).toString('hex')
    }

    private hashtoken(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex')
    }


    async Registation(
        dto: RegistationDTO,
        ipAddress: string,
        userAgent: string,
    ) {
        const email = dto.email.toLocaleLowerCase().trim();

        const existingUser = await this.userModel.findOne({ email: email });

        if (existingUser) {
            throw new ConflictException("Unable to create account, Already User in the System");
        }

        const role = await this.roleModel.findOne({ role: "GUEST" });

        if (!role) {
            throw new BadRequestException("Default role is not configured");
        }

        const passwordhash = await this.hashPassword(dto.password);

        const user = await this.userModel.create({
            email: email,
            passwordHash: passwordhash,
            roleId: role._id,
            accountStatus: AccountStatus.PENDING,
        });

        const token = this.genarteToken();

        const name = user.email
            .split("@")[0]
            .replace(/[._-]/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

        await this.emailService.sendLoginSuccessEmail({
            name,
            email: user.email,
            loginTime: new Date().toLocaleString(),
        });

        await this.auditlogService.create({
            userId: user._id,
            action: "Registation SUCCESS",
            reason: "User Registation successfully",
            ipAddress,
            userAgent,
            endpoint: null,
            metadata: {
                email: user.email,
            },
        });

        return {
            success: true,
            message: 'Registration successful'
        };
    }

    async Login(
        dto: LoginDTO,
        ipAddress: string,
        userAgent: string,
    ) {
        const normalizedEmail = dto.email.toLowerCase().trim();
        const user = await this.userModel.findOne({ email: normalizedEmail });

        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }

        await this.auditlogService.create({
            userId: user._id,
            action: "LOGIN_FAILED",
            reason: "Invalid email or password",
            ipAddress,
            userAgent,
            endpoint: null,
            metadata: {
                email: user.email,
                loginTime: new Date().toISOString(),
            },
        });

        const passwordValid = await this.comparePassword(
            dto.password,
            user.passwordHash ?? '',
        );

        if (!passwordValid) {
            await this.auditlogService.create({
                userId: user._id,
                action: "LOGIN_FAILED",
                reason: "Invalid email or password",
                ipAddress,
                userAgent,
                endpoint: null,
                metadata: {
                    email: user.email,
                    loginTime: new Date().toISOString(),
                },
            });

        }

        const rolename = await this.roleModel.findById(user.roleId);
        if (!rolename) {
            throw new NotFoundException('Role Cannot be Found');
        }
        const userData = {
            id: user._id,
            email: user.email,
            roleId: user.roleId,
            role: rolename.role,
            accountStatus: user.accountStatus,
        };

        const refreshToken = this.genarteToken();
        const refreshTokenHash = this.hashtoken(refreshToken);

        const accessToken = await this.jwtService.signAsync({
            sub: user._id.toString(),
            user: userData,
        });

        const name = user.email
            .split('@')[0]
            .replace(/[._-]/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());

        await this.emailService.sendNotificationEmail(
            user.email,
            {
                name,
                title: "Login Success",
                message: "Login Successfull",
                date: new Date().toLocaleString(),
            },
        );
        await this.auditlogService.create({
            userId: user._id,
            action: "LOGIN_SUCCESS",
            reason: "Login Sccuessfully",
            ipAddress,
            userAgent,
            endpoint: null,
            metadata: {
                email: user.email,
                loginTime: new Date().toISOString(),
            },
        });

        return {
            success: true,
            message: 'Login Successful',
            accessToken,
            refreshToken,
        };

    }
}