1st go to the dir by using cd
then do npm i
then do npm start

next u have to connect with ddatabase

install and intialize the mysql database and create the database called indianne 
u must have all tables

note: remember backend should be 3001 and fontend is 3000 === port numbers

if database is giving trouble
check data is able to insert delete in database
has correct param
if its fine 

check in server.js == node server/server.js 
it should display
Server running on http://localhost:3001
Connected to MySQL database

and check postman api 
get request  http://localhost:3001/api/menu this is for menu 

if it return json which looks similar to this then ur backend is also fine:
[
    {
        "id": 12,
        "title": "Red Wine",
        "price": "12.99",
        "tags": "smooth, bold",
        "type": "wine"
    },
    {
        "id": 13,
        "title": "White Wine",
        "price": "10.99",
        "tags": "crisp, fresh",
        "type": "wine"
    },]

    then check that ports are right, axios is correctly configured. and check each file that is linked with the output
    and you should be good.