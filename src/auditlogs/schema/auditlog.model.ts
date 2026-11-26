import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuditLogDocument = HydratedDocument<AuditLog>;

export enum AuditAction {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    LOGIN_FAILED = 'LOGIN_FAILED',
    LOGOUT = 'LOGOUT',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    EMAIL_VERIFICATION_REQUESTED = 'EMAIL_VERIFICATION_REQUESTED',
    EMAIL_VERIFIED = 'EMAIL_VERIFIED',
    PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
    PASSWORD_RESET_COMPLETED = 'PASSWORD_RESET_COMPLETED',
    PASSWORD_CHANGED = 'PASSWORD_CHANGED',
    OTP_REQUESTED = 'OTP_REQUESTED',
    OTP_VERIFIED = 'OTP_VERIFIED',
    ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
    ACCOUNT_UNLOCKED = 'ACCOUNT_UNLOCKED',
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    ACCESS_GRANTED = 'ACCESS_GRANTED',
    ACCESS_DENIED = 'ACCESS_DENIED',
}

@Schema({ timestamps: true, collection: 'audit_logs', })
export class AuditLog {
    @Prop({ type: Types.ObjectId, ref: 'User', default: null, index: true, })
    userId!: Types.ObjectId | null;

    @Prop({ type: Types.ObjectId, ref: 'User', default: null, index: true, })
    targetUserId!: Types.ObjectId | null;

    @Prop({ required: true, enum: AuditAction, index: true, })
    action!: AuditAction;

    @Prop({ type: String, default: null, trim: true, })
    reason!: string | null;

    @Prop({ type: String, default: null, trim: true, })
    ipAddress!: string | null;

    @Prop({ type: String, default: null, trim: true, })
    userAgent!: string | null;

    @Prop({ type: String, default: null, trim: true, })
    endpoint!: string | null;

    @Prop({ type: Object, default: null, })
    metadata!: Record<string, unknown> | null;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
