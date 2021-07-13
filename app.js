const db = require('./db')
const Patient = require('./models/schema')
const uniqid = require('uniqid')

const express = require('express')

const app = express()
port = 5000


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('public/css'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT || port, ()=>{
    console.log('Server up')
})

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/list', (req, res)=>{
    Patient.find({}, (err, details)=>{
        if(err){
            console.log(err)
        } else {
            res.render('list', {details: details})
        }
    })
})


app.post('/api/add', (req, res)=> {
            const newPatient = new Patient()
            
            newPatient.id = uniqid()
            newPatient.surname = req.body.surname
            newPatient.name = req.body.name
            newPatient.birthDate = req.body.birthDate
            newPatient.case = req.body.case
            newPatient.inHospital = req.body.inHospital

            newPatient.save()
            .then(console.log('Added.'))
            .catch(err => console.log(err))
            res.redirect('/')
})


app.post('/api/delete', async(req, res)=>{
    const patientId = req.body.id
    const response = await Patient.deleteOne({ id: patientId})
    console.log(response)
    res.redirect('/list')
})

app.post('/modify', (req, res)=>{
    const patient = req.body
    Patient.find(patient, (err, details)=>{
        if(err){
            console.log(err)
        } else {
            res.render('modify', {details: details})
        }
    })
})

app.post('/api/modify', async(req,res)=>{
    const response = await Patient.updateOne({
        id: req.body.id 
    }, {
        $set: {
            surname: req.body.surname,
            name: req.body.name,
            birthDate: req.body.birthDate,
            case: req.body.case,
            inHospital: req.body.inHospital
        }
    })
    res.redirect('/list')
})
