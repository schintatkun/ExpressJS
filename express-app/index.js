import express from 'express';
// import favicon from 'serve-favicon';
// import path from 'path';

import data from './data/data.json';

const app = express();
const PORT = 3000;

var _favicon = require('serve-favicon');
var path = require('path');
//favicon   nedd to import path and favicon
app.use(_favicon(path.join(__dirname, 'public', 'favicon.ico')));


//How to load static file in server
//Express.static method that is exist in express API
//.use is a method that allow to use specific middleware to a path
//After express.static() that require to specify which folder need to be used
app.use(express.static('public'));

//this is for images folder on path /images
app.use('/images', express.static('images'));


//method to use JSON
// app.use(express.json());

//{extended: true} taking data that come from client and then stringify it ready for server
app.use(express.urlencoded({extended: true}));


// --------------------------------------------------------------------------------

// Routing
// call method that you want to run
// get method take an actual path, arguments (req, res)
// then run handler(code inside route)

app.get('/', (req, res) => 
    //get data  .json() send json to client
    res.json(data)

    // res.send(`a get request with / route on port ${PORT}`)
);
app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(`a post request with /newItem route on port ${PORT}`);
});


// put method to update data
app.put('/item', (req, res) => 
res.send(`a put request with /item route on port ${PORT}`)
);
app.delete('/item', (req, res) => 
res.send(`a delete request with /item route on port ${PORT}`)
);

//redirect
app.get('/item', (req, res) =>
    res.redirect('http://google.com')
    // res.send(`a post request with /newItem route on port ${PORT}`)
);

app.get('/images', (req, res) =>
    res.download('images/rocket.jpg')
);





// --------------------------------------------------------------------------------
// pass parameters in a routing
// also can pass multiple parameters ex ->  /item/:category/:id

app.get('/item/:id', (req, res) => {
    console.log(req.params.id);
    //convert id string to number store in user variable
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);

    //res command send to client (see on browser)
    res.send(data[user]);
});

// NEXT is function that can handle multiple functions (callback) or handlers call
app.get('/items/:id', (req, res, next) => {
    console.log(req.params.id);
    //convert id string to number store in user variable
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);

    //res command send to client (see on browser)
    res.send(data[user]);

    //call next() then jump to another function (handler)
    //can only do one respond method in a single call (get, put , post, etc)
    next();

}, (req, res) => console.log('Did you get the right Data?')
);

// --------------------------------------------------------------------------------
// Chaining route
// --------------------------------------------------------------------------------

app.route('/items') 
       
    .get((req, res) => res.send(`a get request with /items route on port ${PORT}`))
    .put((req, res) => res.send(`a put request with /items route on port ${PORT}`))
    .post((req, res) => res.send(`a post request with /items route on port ${PORT}`))

// --------------------------------------------------------------------------------
// Middlewares are functions that happen before sending res back to client.


//error-handling middleware
// app.use((err, req,res, next)=> {

// });





app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
    // console.log(data);
});

