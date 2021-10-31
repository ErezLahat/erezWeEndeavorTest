// Add General Variables Here:
//-------------------------------

var books;
var authors;


//-------------------------------



window.addEventListener('load', function() {
    getBooks();



})



// Create Functions Here
//-------------------------------
function sendHttpRequest(method, url, data) {

    const promise = new Promise((resolve, reject) => {
        var xmlHttp;
        xmlHttp = new XMLHttpRequest();

        xmlHttp.open(method, url);
        xmlHttp.responseType = 'json';

        if (data) {
            xmlHttp.setRequestHeader('Content-Type', 'application/json');

        }

        xmlHttp.onload = function() {
            if (xmlHttp.status >= 400) {
                reject(xmlHttp.response);
            } else {
                resolve(xmlHttp.response);
            }
        };

        xmlHttp.onerror = function() {
            reject('YOU HAVE AN ERROR!')
        };

        xmlHttp.send(JSON.stringify(data));
    });
    return (promise);
}


function getBooks() {
    sendHttpRequest("GET", 'http://localhost:3000/books/').then(dataList => {
        var respData = dataList;


        books = respData.books;
        createBooksList();

    }).catch(err => {
        console.log(err);
    });
}


function createBooksList() {
    var book_ul = document.getElementById("books_list");
    for (var i = 0; i < books.length; i++) {
        var book_li = document.createElement("li");
        book_li.appendChild(document.createTextNode(books[i].bookName));
        //setAttribute('id',candidate.value);
        book_li.id = books[i].isbn;
        book_li.setAttribute('onclick', "getBookDetails(" + books[i].isbn + ")");
        book_ul.appendChild(book_li);

    }
}


function getBookDetails(bookID) {
    sendHttpRequest("GET", 'http://localhost:3000/book/' + bookID).then(dataList => {
        var respData = dataList;


        var book_details = respData;
        //console.log(book_details);
        updateDetailSection(book_details);

    }).catch(err => {
        console.log(err);
    });
}


function updateDetailSection(book_details) {
    var book_name = document.getElementById('book_name');
    var isbn = document.getElementById('isbn');
    var author_name = document.getElementById('author_name');
    book_name.innerText = book_details.bookName;
    isbn.innerText = book_details.isbn;
    author_name.innerText = book_details.author.firstName + ' ' + book_details.author.lastName;
}


function addAuthor() {



    var first_name = document.getElementById('first_name').value;

    var last_name = document.getElementById('last_name').value;
    var myAuthor = { 'firstName': first_name, 'lastName': last_name };
    // console.log('myAuthor ' + myAuthor.firstName);



    sendHttpRequest("POST", 'http://localhost:3000/author/', myAuthor).then(dataList => {
        var respData = dataList;

        authors = respData.authors;
        console.log(authors);

    }).catch(err => {
        console.log(err);
    });




}