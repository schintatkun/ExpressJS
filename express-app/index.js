import express from 'express';
import data from './data/data.json';

const app = express();
const PORT = 3000;

//How to load static file in server
//Express.static method that is exist in express API
//.use is a method that allow to use specific middleware to a path
//After express.static() that require to specify which folder need to be used
app.use(express.static('public'));

//this is for images folder on path /images
app.use('/images', express.static('images'));

// --------------------------------------------------------------------------------


// call method that you want to run
// get method take an actual path, arguments (req, res)
// then run handler
app.get('/', (req, res) => 
    //get data
    res.json(data)

    // res.send(`a get request with / route on port ${PORT}`)
);
app.post('/newItem', (req, res) => 
    res.send(`a post request with /newItem route on port ${PORT}`)
);
// put method to update data
app.put('/item', (req, res) => 
    res.send(`a put request with /item route on port ${PORT}`)
);
app.delete('/item', (req, res) => 
    res.send(`a delete request with /item route on port ${PORT}`)
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







app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
    console.log(data);
});

