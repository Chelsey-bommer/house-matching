//Require Mongoose
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    stad: {
        type: String,
        default: null
    },
    budget: {
        type: Number,
        default: null
    }
},{
    collection: 'preferences'
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
    wachtwoord: {
        type: String,
        required: [true, `Vergeet niet uw gewenste wachtwoord in te voeren.`]
    },
    voorkeuren: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: `Preference`,
        default: null
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
    }
},{
    collection: 'houses'
}, {
    toJSON: {
        virtuals: true
    }
});

const Preference = mongoose.model(`Preference`, preferenceSchema);
const User = mongoose.model(`User`, userSchema);
const House = mongoose.model(`House`, houseSchema);

module.exports = {
    Preference,
    User,
    House
};