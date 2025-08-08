import mongoose  from 'mongoose';
import dotenv from 'dotenv'


 const dbConnection =async ()=>{

 return await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('db is connected');

    }).catch((err) => {
        console.log('DB Connection ERROR>>>>>>>>>>>>>', err);

    })
}

export default dbConnection