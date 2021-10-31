var express = require('express');
var router = express.Router();


const authors = {
    'authors': [
        { id: 1, firstName: "J.R.R", lastName: "Tolkin" },
        { id: 2, firstName: "Ram", lastName: "Oren" }
    ]
};


const books = {
    'books': [
        { bookName: 'The Hobbit', isbn: '9731235671', author: 1 },
        { bookName: 'Lord of The Rings', isbn: '9731235672', author: 1 },
        { bookName: 'Kane Mark', isbn: '878223456', author: 2 }
    ]
};


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/books/', function(req, res, next) {
    res.send(books);
});


router.get('/book/:_id/', function(req, res, next) {
    var id = req.params._id;
    var books_list = books.books;
    var result = '';
    for (var i = 0; i < books_list.length; i++) {

        if (books_list[i].isbn == id) {
            result = books_list[i];
        }

    }

    if (result) {
        var my_author_index = result.author;
        var authors_list = authors.authors;
        for (var i = 0; i < authors_list.length; i++) {

            if (authors_list[i].id == my_author_index) {
                result.author = authors_list[i];
            }

        }
    }

    res.send(result);
});


router.get('/authors/', function(req, res, next) {
    res.send(authors);
});


router.get('/author/:_id/', function(req, res, next) {
    var id = req.params._id;
    var authors_list = authors.authors;
    var result = '';
    for (var i = 0; i < authors_list.length; i++) {

        if (authors_list[i].id == id) {
            result = authors_list[i];
        }

    }
    res.send(result);
});



router.post('/author/', function(req, res, next) {


    var authors_list = authors.authors;
    var new_author = { id: 7, firstName: req.body.firstName, lastName: req.body.lastName };
    authors_list.push(new_author);
    console.log(new_author);
    res.send(authors);
});

router.post('/book/', function(req, res, next) {
    var new_book = { bookName: req.params.bookName, isbn: req.body.isbn, author: req.body.author };
    var books_list = books.books;
    books_list.push(new_book);
    res.send(books);
});



module.exports = router;