import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PermissionsDocument = HydratedDocument<Permissions>;

@Schema({ timestamps: true })
export class Permissions {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    apiPath: string;

    @Prop({ required: true })
    method: string;

    @Prop({ required: true })
    module: string;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date

    @Prop()
    isDeleted?: Date

    @Prop()
    deletedAt?: Date

    @Prop({ type: Object })
    createdBy?: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    }

    @Prop({ type: Object })
    updatedBy?: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    }

    @Prop({ type: Object })
    deletedBy?: {
        _id: mongoose.Schema.Types.ObjectId,
        email: string
    }
}


export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
