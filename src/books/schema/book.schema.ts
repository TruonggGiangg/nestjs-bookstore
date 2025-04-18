import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type BookDocument = HydratedDocument<Book>;


//review
@Schema({ timestamps: true })
export class Review {
    userId: Types.ObjectId | string;
    userName: string;
    comment: string;
    rating: number;
    createdAt: Date;
}

@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ type: [String] }) // Danh sách tác giả
    author: string[];

    @Prop()
    isBook: boolean;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop()
    sold: number;

    @Prop()
    description?: string;

    @Prop({ type: [String] }) // Danh sách ảnh bìa
    coverImage?: string[];

    @Prop()
    logo?: string;

    @Prop({
        type: Object
    })
    attributes?: {
        publisher?: string;
        pages?: number;
        language?: string;
        classification?: Types.ObjectId[];
        isbn?: string;
        publishedDate?: Date;
    };

    @Prop({ type: [Object] })
    reviews?: Review[];

    @Prop()
    rating?: number;


    @Prop()
    isDeleted?: boolean;

    @Prop()
    deletedAt?: Date;

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

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.index({
    title: 'text',
    author: 'text',
    description: 'text',
});