import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model, Types } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { User, UserDocument } from "src/users/schema/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        config: ConfigService,

        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow<string>('JWT_SECRET')
        })
    }

    async validate(payload: JwtPayload) {
        const user = await this.userModel
            .findById(payload.sub)
            .select('roleId accountStatus emailVerified email')
            .populate('roleId', 'role');

        if (!user) {
            throw new UnauthorizedException('User cannot be found');
        }

        const role = user.roleId as unknown as {
            _id: Types.ObjectId;
            role: string;
        };

        return {
            id: user._id,
            email: user.email,
            roleId: role._id,
            role: role.role,
            accountStatus: user.accountStatus,
            sessionId: payload.sessionId,
        };
    }
}