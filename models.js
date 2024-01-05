const mongoose = require('mongoose');

let songSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Artist: {
        Name: String, 
        Bio: String
    },
    Genre: {
        Name: String, 
        Description: String
    },
    Release: Date,
    ImagePath: String    
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    Favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]
});

let Song = mongoose.model('Song', songSchema);
let User = mongoose.model('User', userSchema);

module.exports.Song = Song;
module.exports.User = User;

