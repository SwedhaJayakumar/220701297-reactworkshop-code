const express=require("express");
const morgan =require("morgan");
const pg=require("pg");
const cors=require("cors");
const bodyParser=require("body-parser");
require("dotenv").config();

const app=express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
const db= new pg.Client({
    host:"localhost",
    port:5432,
    database:"swedha",
    user:"postgres",
    password:"swedha@2311"
});
db.connect().then(()=>{
    console.log("database connected")
});
app.post("/add",async(req,res)=>{
    const data= req.body;
    await db.query(`INSERT INTO history(description,mode,amount) values($1,$2,$3)`,
        [data.description,data.mode,data.amount]);
    res.status(201).send("record inserted successfully");
})
app.get("/",(req,res)=>{
    res.send("Hello World!");
})
app.listen(3001, ()=>{
    console.log('Server started at port 3001');
})
