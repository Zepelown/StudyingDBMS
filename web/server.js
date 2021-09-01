const fs = require('fs');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: conf.host,
	user: conf.user,
	password: conf.password,
	port: conf.port,
	database: conf.database
})

connection.connect((err) => {
	if (err) throw err;
	console.log('Connected!');
});

app.get('/api/customers', (req, res) => {
	connection.query(
		'SELECT * FROM customer',
		(err, rows, fields) => {
			if (err) throw err;
			res.send(rows);
		}
	)
});

app.listen(port, () => console.log(`Listening on port ${port}`));