//Require Mongoose
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, `Vul asltublieft een email in.`]
    },
    password: {
        type: String,
        required: [true, `Vergeet niet uw gewenste wachtwoord in te voeren.`]
    },
    refreshToken: String
}, {
    toJSON: {
        virtuals: true
    }
});

const houseSchema = new Schema({
    prijs: {
        type: Number,
        required: [true, `Vul asltublieft de prijs in.`]
    },
    adres: {
        type: String,
        required: [true, `Vul asltublieft het adres in.`]
    },
    stad: {
        type: String,
        required: [true, `Vul asltublieft de stadsnaam in.`]
    }
}, {
    toJSON: {
        virtuals: true
    }
});

const User = mongoose.model(`User`, userSchema);
const House = mongoose.model(`House`, houseSchema);

module.exports = {
    User,
    House
};