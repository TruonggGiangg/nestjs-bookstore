import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    author: string[];

    @Prop({ required: true })
    categories: string[];

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop()
    description: string;

    @Prop()
    coverImage: string;

    @Prop()
    publishedDate: Date;

    @Prop()
    rating: number;

    @Prop()
    logo: string;

    @Prop({ type: [{ userId: mongoose.Schema.Types.ObjectId, comment: String, rating: Number, createdAt: Date }] })
    reviews: Array<{ userId: mongoose.Schema.Types.ObjectId, comment: string, rating: number, createdAt: Date }>;

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


export const BookSchema = SchemaFactory.createForClass(Book);
// "_id": ObjectId,
// "title": "The Great Gatsby",
// "author": ["F. Scott Fitzgerald"],
// "categories": ["Classic", "Fiction"],
// "price": 10.99,
// "stock": 100,
// "description": "A classic novel...",
// "coverImage": "https://example.com/image.jpg",
// "publishedDate": ISODate,
// "rating": 4.5,
// "reviews": [
//   {
//     "userId": ObjectId,
//     "comment": "Great book!",
//     "rating": 5,
//     "createdAt": ISODate
//   }
// ],
// "createdAt": ISODate,
// "updatedAt": ISODate

