import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema({ timestamps: true })
export class Event {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    image: string;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date

    @Prop()
    isDeleted?: boolean

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
export const EventSchema = SchemaFactory.createForClass(Event);