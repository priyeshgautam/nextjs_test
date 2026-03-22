import mongoose from "mongoose";
const MONGOOSE_URL = process.env.MONGODB_URL

async function dbConnect(){
    try{
        const db = await mongoose.connect(MONGOOSE_URL);
        console.log(`Connected to MongoDB at ${MONGOOSE_URL}`);
    }catch(error){
        console.error(`Failed to connect to MongoDB at ${MONGOOSE_URL}: ${error}`);
        throw error;
    }

}

export default dbConnect