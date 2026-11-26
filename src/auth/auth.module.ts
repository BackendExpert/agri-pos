import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "src/role/schema/role.schema";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "src/users/schema/user.schema";
import { AuditLog, AuditLogSchema } from "src/auditlogs/schema/auditlog.model";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { EmailService } from "src/common/emails/email.service";
import { AuditLogModule } from "src/auditlogs/auditlog.module";

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        AuditLogModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.getOrThrow<string>('JWT_SECRET'),
                signOptions: { expiresIn: '15m'}
            })
        }),

        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema },
            { name: AuditLog.name, schema: AuditLogSchema },
        ])
    ],

    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, EmailService],
    exports: [JwtModule, AuthService]
})

export class AuthModule { }