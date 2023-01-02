// import mongoose from 'mongoose'

// const connectDB = () => {

//     if(mongoose.connections[0].readyState){
//         console.log('Already connected.')
//         return;
//     }
//     mongoose.connect(process.env.MONGODB_URL, {
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }, err => {
//         if(err) throw err;
//         console.log('Connected to mongodb.')
//     })
// }


// export default connectDB
// ---------------------------------------------------


import { MongoClient } from "mongodb";
const connectDB = () => {
    const client = MongoClient.connect(process.env.MONGODB_URL)
    return client;
}
export const findInDB = async (model, field) => {
    let result;
    const client = await connectDB()
    if (field == 'ALL') result = await client.db().collection(model).find().toArray();
    else result = await client.db().collection(model).findOne(field)
    return result
}

export const insertInDB = async (model, document) => {
    const client = await connectDB()
    await client.db().collection(model).insertOne(document)
    client.close()
}
