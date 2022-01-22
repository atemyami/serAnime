var mysql = require('mysql');
var express = require('express');
var path = require('path');
var cors = require('cors')
var app = express();
app.use(express.json());
app.use(cors());
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Qt1AY39.0ay39ts13kx7',
	database : 'auth'
});
//ALTER USER 'root'@'localhost' IDENTIFIED BY 'Qt1AY39.0ay39ts13kx7';

app.post('/reg', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    connection.query('INSERT INTO login(username, password) VALUES(?, ?)',
        [username, password], 
    (err, result)=>{
        console.log(err)
    });
	
});

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.username;
    connection.query('SELECT * FROM login WHERE username = ? AND password  =  ?',
    [username, password],
    (err, result)=>{
        if(err){
            res.send({err: err})
        }
       if(result.length > 0){
            res.send(result)
        }
        else {
            res.send({message: 'wrong password combination'})
        }
    })
})

app.listen(5000,()=>{
    console.log('server is running')
});

