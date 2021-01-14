// Setup empty JS object to act as endpoint for all routes


//express to run server and routes
const express = require('express');

//start an unstance of app
const app=express();



//dependencies
const bodyParser=require('body-parser');

//middlewares
//here we are configuring express to use body-parser as middleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors for cross origin allowance
const cors=require('cors');
const { request } = require('http');
const { response } = require('express');
app.use(cors());

//initialize the main project folder
app.use(express.static('website'));

const port =1238;
//spin up the server
const server = app.listen(port, listening);

//callback to debug
function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

//this object will carry the data we recieved from the user and api and make it available to get anytime
projectData ={};

//we create a post route on the server side so we can recieve data from client side
app.post('/temp', callBack);
function callBack(req,res){  
    //we assign the data recieved from client side to the end point object
    projectData.temp = req.body.temp ;
    projectData.feelings = req.body.feelings ;
    projectData.date= req.body.date;

    //the route will respond with the end point object after adding the recieved data to it
    res.send(projectData); 
    //we log the same object to the terminal
    console.log(projectData);    
};
// get route so we can read the data from the endpoint
app.get('/temp' , getData);

function getData(req, res){

res.send(projectData);
console.log(projectData);
}