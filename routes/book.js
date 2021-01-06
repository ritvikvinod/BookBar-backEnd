import express from "express";
const book = require('../models/book.schema')


const bookRouter = express.Router();


/*Post a book*/ 
bookRouter.route('/Addbook').post(async (req, res) => {
    const body = req.body;
    const newBook = new book(body);
    newBook.save()
        .then(()=>res.json({status:'Book added!!'}))
        .catch(err=>res.status(400).json('Error: '+err))
})

/*Get all books*/
bookRouter.route('/getAllBooks').get((req, res) => {
    book.find()
        .then(books => res.json(books))
        .then(() => res.json({status: 'Showing all Books'}))
        .catch(err => res.status(400).json('Error: '+err))
})

/*Get book by ID*/
bookRouter.route('/getBookById/:bid').get((req, res) => {
    const bookId = req.params['bid'];
    book.findById(bookId)
        .then(book => res.json(book))
        .catch(err => res.status(400).json('Error: '+err))
})

bookRouter.route('/deleteBook/:isbn').delete((req, res)=>{
    const isbn = req.params['isbn'];
    book.remove({"isbn":{"$exists":true},
                 "isbn.identifier":isbn})
                .then(book => res.json(book)) 
                .catch(err => res.status(400).json('err:' + err))
})


bookRouter.route('/updateBook/:isbn').put((req, res)=>{
    const isbn = req.params['isbn'];
    const price = req.body.price;
    const quantity = req.body.quantity;
 

    book.updateOne({"isbn":{"$exists":true},
                 "isbn.identifier":isbn}, { $set: {'price.amount':price, quantity:quantity} })
                .then(book => res.json(book)) 
                .catch(err => res.status(400).json('err:' + err))
})


//search  book by isbn
 bookRouter.route('/getBookByIsbn/:isbn').get((req,res) =>{
     const isbn = req.params['isbn'];
     book.find({"isbn":{"$exists": true},
                "isbn.identifier":isbn})
            .then(book => res.json(book))
            .catch(err => res.status(400).json('Err: '+err))   
 })


export default bookRouter;




