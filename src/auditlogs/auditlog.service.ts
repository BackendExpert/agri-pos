import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import {
    AuditLog,
    AuditLogDocument,
} from "./schema/auditlog.model";

export interface CreateAuditLogInput {
    userId?: string | Types.ObjectId | null;
    targetUserId?: string | Types.ObjectId | null;
    action?: string | null;
    reason?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    endpoint?: string | null;
    metadata?: Record<string, unknown> | null;
}

@Injectable()
export class AuditLogService {
    constructor(
        @InjectModel(AuditLog.name)
        private readonly auditLogModel: Model<AuditLogDocument>,
    ) {}

    async create(data: CreateAuditLogInput): Promise<AuditLogDocument> {
        return this.auditLogModel.create({
            userId: this.toObjectId(data.userId),
            targetUserId: this.toObjectId(data.targetUserId),
            action: data.action
                ? (data.action as any)
                : undefined,
            reason: data.reason ?? null,
            ipAddress: data.ipAddress ?? null,
            userAgent: data.userAgent ?? null,
            endpoint: data.endpoint ?? null,
            metadata: data.metadata ?? null,
        });
    }

    private toObjectId(
        value?: string | Types.ObjectId | null,
    ): Types.ObjectId | null {
        if (!value) {
            return null;
        }

        if (value instanceof Types.ObjectId) {
            return value;
        }

        if (!Types.ObjectId.isValid(value)) {
            return null;
        }

        return new Types.ObjectId(value);
    }
}