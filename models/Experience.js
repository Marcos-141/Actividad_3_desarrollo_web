const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio'],
        trim: true
    },
    title: {
        type: String,
        required: [true, 'El cargo o título es obligatorio'],
        trim: true
    },
    startDate: {
        type: String,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    endDate: {
        type: String,
        default: 'Presente'
    },
    description: {
        type: String,
        required: [true, 'La descripción de responsabilidades es obligatoria']
    },
    technologies: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Experience', ExperienceSchema);