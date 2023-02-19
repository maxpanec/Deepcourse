const express = require('express');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
  
const app = express();

app.use(express.json());

try{
	mongoose.connect(
		"mongodb+srv://deepcourse:njTtojFCOwrHmkmM@deepcourse.nyh03pf.mongodb.net/?retryWrites=true&w=majority",
		{useNewUrlParser: true, useUnifiedTopology: true}
	);
	console.log("Connected to Database Successfully!")
} catch (error) {
	console.log(error)
	console.log("Failed to Connect to Database!")
}

const PORT = 3002;
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);