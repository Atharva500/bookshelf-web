import express, { request, response } from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book }  from './models/bookstore_model.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome to my Bookstore');
});

app.use('/books',bookRoutes);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('Database connected');
    app.listen(PORT, ()=>{
        console.log('App is listening to the port: ${PORT}');
    });
}).catch((error) => {
    console.log(error);
});