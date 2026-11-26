import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuditLog, AuditLogSchema } from "./schema/auditlog.model";
import { AuditLogService } from "./auditlog.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: AuditLog.name,
                schema: AuditLogSchema,
            },
        ]),
    ],
    providers: [AuditLogService],
    exports: [AuditLogService],
})
export class AuditLogModule {}