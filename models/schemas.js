//Require Mongoose
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    city: {
        type: String
    },
    budget: {
        type: Number
    }
}, {
    toJSON: {
        virtuals: true
    }
});

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, `Vul asltublieft een email in.`]
    },
    password: {
        type: String,
        required: [true, `Vergeet niet uw gewenste wachtwoord in te voeren.`]
    },
    preferences: {
        type: [preferenceSchema],
        default: null
    },
    refreshToken: String
}, {
    toJSON: {
        virtuals: true
    }
});

const houseSchema = new Schema({
    price: {
        type: Number,
        required: [true, `Vul asltublieft de prijs in.`]
    },
    adress: {
        type: String,
        required: [true, `Vul asltublieft het adres in.`]
    },
    city: {
        type: String,
        required: [true, `Vul asltublieft de stadsnaam in.`]
    }
}, {
    toJSON: {
        virtuals: true
    }
});

const Preference = mongoose.model(`preference`, preferenceSchema);
const User = mongoose.model(`User`, userSchema);
const House = mongoose.model(`House`, houseSchema);

module.exports = {
    Preference,
    User,
    House
};