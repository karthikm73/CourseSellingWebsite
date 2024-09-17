const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const port = 3000

const adminRouter = require('../server/Routes/admin.js')
const userRouter = require('../server/Routes/user.js')
const commonRouter = require('../server/Routes/common.js')
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/common',commonRouter);


app.listen(port, () => {
  console.log(`listening on port ${port} ......`)
})


mongoose.connect('mongodb+srv://karthikm0312:karthikm0312@cluster0.sbpgqcf.mongodb.net/TakeCourse');
