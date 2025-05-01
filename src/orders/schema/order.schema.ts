import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class OrderItem {
    @Prop({ type: Types.ObjectId, required: true })
    productId: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;
}

const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: [OrderItemSchema], required: true })
    items: OrderItem[];

    @Prop({ default: 'pending', enum: ['pending', 'processing', 'completed', 'cancelled'] })
    status: string;

    @Prop()
    totalAmount: number;

    @Prop({ type: String, required: true })
    shippingAddress: string;

    @Prop({ required: true })
    numberPhone: string

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

export const OrderSchema = SchemaFactory.createForClass(Order);
