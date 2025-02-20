import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ type: [String] }) // Danh sách tác giả
    author: string[];

    @Prop({ type: [{ type: Types.ObjectId, ref: "Categories" }], required: true })
    categories: Types.ObjectId[];

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop()
    description?: string;

    @Prop({ type: [String] }) // Danh sách ảnh bìa
    coverImage?: string[];

    @Prop()
    logo?: string;

    @Prop({
        type: {
            publisher: { type: String },
            publishedYear: { type: Number },
            pages: { type: Number },
            language: { type: String },
            isbn: { type: String }
        }
    })
    attributes?: {
        publisher?: string;
        publishedYear?: number;
        pages?: number;
        language?: string;
        isbn?: string;
    };

    @Prop()
    publishedDate?: Date;

    @Prop()
    rating?: number;

    @Prop({
        type: [
            { userId: Types.ObjectId, comment: String, rating: Number, createdAt: Date }
        ]
    })
    reviews?: Array<{ userId: Types.ObjectId; comment: string; rating: number; createdAt: Date }>;

    @Prop()
    isDeleted?: boolean;

    @Prop()
    deletedAt?: Date;

    @Prop({
        type: { _id: Types.ObjectId, email: String }
    })
    createdBy?: { _id: Types.ObjectId; email: string };

    @Prop({
        type: { _id: Types.ObjectId, email: String }
    })
    updatedBy?: { _id: Types.ObjectId; email: string };

    @Prop({
        type: { _id: Types.ObjectId, email: String }
    })
    deletedBy?: { _id: Types.ObjectId; email: string };
}

export const BookSchema = SchemaFactory.createForClass(Book);
