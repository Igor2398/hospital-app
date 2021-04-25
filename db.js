const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.CONNECTIONSTRING, connectionParams)
    .then( ()=> {
        console.log("Connected to db!")
    })
    .catch( (err)=>{
        console.log(`Error connecting to the database. \n${err}`)
    })