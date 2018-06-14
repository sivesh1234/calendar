var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({  extended: true }));

// static content
app.use(express.static('html'));

// Have some books in an array
var books = []
books[0] = {
  author: 'Tutorial',
  date: '2018-11-10'
}
books[1] = {
  author: 'Football',
  date: '2018-09-17'
}

// get all the books
app.get('/books', function (req, res) {
  res.type('text/json')
  res.send(JSON.stringify(books));
})

// get one specific book
app.get('/books/:id', function (req, res) {
  var id = req.params.id;

  res.type('text/json')
  res.send(JSON.stringify(books[id]));
})

// post a new book
app.post('/books', function (req, res) {
  books.push(req.body);
  res.sendStatus(200);
})
// put
app.put('/books/:id', (req, res) => {
  var id = req.params.id;
  var book = req.body;
  books[id] = book
    res.sendStatus(200);
});
//delete
app.delete('/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));

    if (!book) return res.status(404).send('The book with the given ID was not found.');

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.send(books);
});

// start it
var server = app.listen(8081);
