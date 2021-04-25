const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PatientSchema = new Schema({
    id: {
        type: String,    
    },
    surname: {
        type: String,
    },
    name: {
        type: String,
    },
    birthDate: {
        type: String,
        default: Date,
    },
    case: {
        type: String,
    },
    inHospital: {
        type: Boolean,
    }
}, { collection: 'Patients' })

module.exports=mongoose.model('Patients', PatientSchema, 'Patients');