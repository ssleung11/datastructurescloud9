const { Client } = require('pg');

// AWS RDS POSTGRESQL INSTANCE - this is the credentials for connecting the database 
var db_credentials = new Object();
db_credentials.user = 'aaron';
db_credentials.host = '// get it from the thing that was created ';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW; // create a .env file and use that key to store your password 
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table: // look at video on SQL code (semicolon is SUPER imp in SQL)
var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aalocations;"; // this deletes the table, if you're not happy with the values and want to start over, this delets the table 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});