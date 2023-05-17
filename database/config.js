import mongoose from "mongoose";

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Base de datos online');
    }
    catch(error){
        console.error(error);
        throw new Error('Error en base de datos');
    }
};

export {dbConnection}