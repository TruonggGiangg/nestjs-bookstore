import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Permission' }] }) // Mảng ID của Permissions
    permissions: Types.ObjectId[];

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


export const RoleSchema = SchemaFactory.createForClass(Role);
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
//     "comment": "Great Role!",
//     "rating": 5,
//     "createdAt": ISODate
//   }
// ],
// "createdAt": ISODate,
// "updatedAt": ISODate

