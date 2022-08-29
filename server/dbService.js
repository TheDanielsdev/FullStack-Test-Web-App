const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

  
const connection = mysql.createConnection({
   
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,

});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('Database ' + connection.state + ', Good job!');
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }


    //Get Request
    async getAllData() {
        try{
            const response = await new Promise((resolve, reject) => {
                //names is our DB table NAme
                const query = "SELECT * FROM names";

                connection.query(query, (err, results) => {
                    //if theres an error then:
                    if(err) reject(new Error(err.message));
                    //if there is no error then:
                    resolve(results);
                })

            });

            //this console.log below prints an empty array [] to the console for now because no data exists yet.
            // however it will show the data that we are getting if it is not empty and our request is sucessful
            // console.log(response);
            return response;
        } catch(err) {
            console.log(err);
        }
    }



    //Post Request
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                //names is our DB table NAme
                //we use qustion marks so as to avoid sql injection
                const query = "INSERT INTO names (name, date_added) VALUES (?, ?);";

                connection.query(query, [name, dateAdded],(err, result) => {
                    //if theres an error then:
                    if(err) reject(new Error(err.message));
                    //if there is no error then:
                    resolve(result.insertId);
                })

            });

            
            // console.log(insertId);
            return insertId;
        } catch(err) {
            console.log(err);
        }
    }




    //Post into comment table
    async insertNewComment(names, comments) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
              
                //we use qustion marks so as to avoid sql injection
                const query = "INSERT INTO comments (names, comments, date_added) VALUES (?, ?, ?);";

                connection.query(query, [names, comments, dateAdded],(error, results) => {
                    //if theres an error then:
                    if(error) reject(new Error(error.message));
                    //if there is no error then:
                   
                })

            });

            //this console.log below prints an empty array [] to the console for now because no data exists yet.
            // console.log(insertComment);
            return insertId;
        } catch(err) {
            console.log(err);
        }
    }
}











module.exports = DbService;



