//Require Mongoose
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, `Vul asltublieft een username in.`]
    },
    password: {
        type: String,
        required: [true, `Vergeet niet uw gewenste wachtwoord in te voeren.`]
    },
    preferences: {
        stad: String,
        budget: Number
    },
    refreshToken: String
},{
    collection: 'users'
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
    naam: {
        type: String,
        required: [true, `Vul asltublieft het adres in.`]
    },
    stad: {
        type: String,
        required: [true, `Vul asltublieft de stadsnaam in.`]
    },
    favorited: {
        type: Boolean,
        default: false
    },
    foto: {
        type: String,
        default: true
    }
},{
    collection: 'houses'
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