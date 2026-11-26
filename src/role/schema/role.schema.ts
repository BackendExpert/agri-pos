import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, Types } from "mongoose";

export type RoleDocument = Role & Document

@Schema({ timestamps: true })
export class Role {
    @Prop({ unique: true, required: true })
    role!: string;

    @Prop({ type: [MongooseSchema.Types.ObjectId], default: [] })
    permissions!: Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);