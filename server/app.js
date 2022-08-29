const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//create
app.post('/insert', (req, res) => {
   const {name} = req.body;
   const db = dbService.getDbServiceInstance();
   const result = db.insertNewName(name);

   result
   .then(data => res.json({success : true }))
   .catch(error => console.log(error));
   console.log('Post route is working')
})

//create for commenting db
app.post('/insert/comment', (req, res) => {
    const {names, comments} = req.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewComment(names, comments);
 
    result
    .then(data => res.json({success : true }))
    .catch(error => console.log(error));
    console.log('Comment route is working')
 })


//read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    
    const result = db.getAllData();

    result
    .then(data => response.json({
        data : data
    }))
    .catch(error => console.log(error));
    console.log('Get route working');
   


});
 
//delete



//update

app.listen(process.env.PORT, ()=> {
    console.log('App is running');
})