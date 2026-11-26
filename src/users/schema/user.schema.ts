
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum AccountStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
    LOCKED = 'LOCKED',
    DISABLED = 'DISABLED',
}

@Schema({ timestamps: true, collection: 'users' })
export class User {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email!: string;

    @Prop({ required: true })
    passwordHash?: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'Role' })
    roleId!: Types.ObjectId;

    @Prop({ required: true, enum: AccountStatus, default: AccountStatus.PENDING })
    accountStatus!: AccountStatus;

    @Prop({ type: Date, default: null })
    lastLoginAt!: Date | null;

    @Prop({ type: String, default: null })
    lastLoginIp!: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ roleId: 1 });
UserSchema.index({ accountStatus: 1 });
UserSchema.index({ lastLoginAt: -1 });
