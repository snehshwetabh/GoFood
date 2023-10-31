// global.foodData = require('./db')(function call(err, data, CatData) {
//     // console.log(data)
//     if(err) console.log(err);
//     global.foodData = data;
//     global.foodCategory = CatData;
//   })



const express = require('express')
const app = express()
const port = 6001
const mongoDB=require("./db")
mongoDB();

app.use((req,res,next)=>{          //these lines are added to remove CORS problem
res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
);
next();
})

app.use(express.json())    //written in order to use express in json 

app.use('/api',require("./Routes/CreateUser"));  // slash api likhne se link pe add hojyega,/ api/createuser se CreateUser page wla content dikhega
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.use('/api',require("./Routes/CreateUser"));

app.get('/', (req, res) => {
res.send('Hello World!')
})


app.listen(port, () => {
console.log(`Listening on port ${port}`)
})