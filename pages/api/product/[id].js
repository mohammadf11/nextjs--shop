import Product from '../../../models/productModel';
import { json } from 'node:stream/consumers';
import { findInDB } from '../../../utils/connectDB';
var ObjectId = require('mongodb').ObjectId;
export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res);
            break;
    }
}


const getProduct = async (req, res) => {
    try {
        const { id } = await req.query
        const product = await findInDB('product', { _id: ObjectId(id) })
        if(!product) return res.status(500).json({err:'this product does not exist'})
        res.status(200).json({product})
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}