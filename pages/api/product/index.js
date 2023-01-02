import Product from '../../../models/productModel';
import { json } from 'node:stream/consumers';
import { findInDB } from '../../../utils/connectDB';

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProducts(req, res);
            break;
    }
}


const getProducts = async (req, res) => {
    try {
        const products = await findInDB('product', "ALL")
        res.status(200).json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}