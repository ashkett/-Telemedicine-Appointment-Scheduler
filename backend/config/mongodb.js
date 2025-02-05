import mongoose from "mongoose";

const connectDB = async () => {

<<<<<<< HEAD
    mongoose.connection.on('connected', () => console.log("Database connected!") );

    await mongoose.connect(`${process.env.MONGODB_URI}/telemed`);
}

export default connectDB;
=======
    mongoose.connection.on('connected', ()=> console.log("Database Connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/telemedx`)
}

export default connectDB
>>>>>>> da05cc051b69c560ede27383f9ee76b145881147
