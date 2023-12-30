import express, { request } from 'express';
import { Book } from '../models/bookstore_model.js';

const router = express.Router();

// Add new book
router.post('/', async(request, response) => {
    try{
        if( !request.body.title || !request.body.author || !request.body.publisherYear){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publisherYear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publisherYear: request.body.publisherYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get All Books
router.get('/', async(request,response) => {
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Find Book by id
router.get('/:id', async(request,response) => {
    try{
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Update book
router.put('/:id', async(request,response) => {
    try{
        if(!request.body.title || !request.body.author || !request.body.publisherYear){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publisherYear',
            });
        }

        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        
        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: "Book details updated successfully"});
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Delete Book
router.delete('/:id', async(request,response) => {
    try{
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book deleted successfully'});

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;