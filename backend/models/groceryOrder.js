import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const orderSchema = new mongoose.Schema({
    customer: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true
            // validate: {
            //     validator: function (v) {
            //         return /^01[3-9]\d{8}$/.test(v);
            //     },
            //     message: props => `${props.value} is not a valid Bangladeshi phone number!`
            // }
        },
        address: {
            type: String,
            required: true,
            trim: true
        }
    },
    orderItems: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null
    }
}, {
    timestamps: true
});

// // Indexes
// orderSchema.index({ 'customer.phone': 1 });
// orderSchema.index({ status: 1 });
// orderSchema.index({ createdAt: -1 });

const GroceryOrder = mongoose.model('groceryOrder', orderSchema);

export default GroceryOrder;
