
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRouter = require("./routes/admin");
// const userRouter = require("./routes/user");


const app = express();

app.use(cors());
app.use(express.json());

app.use('/admin',adminRouter);
// app.use('/user',userRouter);


mongoose.connect('mongodb+srv://karthikm0312:karthikm0312@cluster0.sbpgqcf.mongodb.net/coursesapp');


app.listen(3000,()=>console.log("listening........"));