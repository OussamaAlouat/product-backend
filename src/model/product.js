import mongoose from 'mongoose';
import {Schema} from 'mongoose';


const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: null
    }
});
export default mongoose.model('Product', ProductSchema);