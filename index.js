const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();

let movies = [
    {
        "title": "Kill Bill",
        "director": "Quentin Tarantino"
    },
    {
        "title": "The Godfather", 
        "director": "Francis Ford Coppola",
        "Genre": {
            "Name": "Drama"
        },
    },
    {
        "title": "It Follows",
        "director": "David Robert Mitchell",
        "Genre": {
            "Name": "Thriller, Horror"
        },
    },
    {
        "title": "Gremlins",
        "director": "Joe Dante"
    },
    {
        "title": "Apocalypse Now",
        "director": "Francis Ford Coppola"
    },
    {
        "title": "The Other Side of the Wind",
        "director": "Orson Welles"
    },
    {
        "title": "À bout de souffle (Breathless)",
        "director": "Jean-Luc Godard"
    },
    {
        "title": "The Perfection",
        "director": "Richard Shepard"
    },
    {
        "title": "Whiplash",
        "director": "Damien Chazelle"
    },
    {
        "title": "Fight Club",
        "director": "David Fincher"
    }
]

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    const {title} = req.params;
    const movie = movies.find(movie => movie.title === title);
    
    if (movie){
        res.status(200).json(movie);
    } else {
        res.status(400).send('No movie found'); 
    }
});

app.get('/movies/genre/:genreName', (req, res) => {
    // const {genreName} = req.params;
    // const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;
    
    // if (genre){
    //     res.status(200).json(genre);
    // } else {
    //     res.status(400).send('No genre found'); 
    // }
    res.send('Successful GET request returning data about a genre');
});

app.get('/movies/director/:directorName', (req, res) => {
    // const {directorName} = req.params;
    // const director = movies.find(movie => movies.director === directorName).director;
    
    // if (director){
    //     res.status(200).json(director);
    // } else {
    //     res.status(400).send('No director found'); 
    // }
    res.send('Successful GET request returning data about a director by name');
});

app.post('/users', (req, res) => {
    // const newUser = req.body; 

    // if (newUser.name) {
    //     newUser.id = uuid.v4();
    //     users.push(newUser);
    //     res.status(201).json(newUser);
    // } else {
    //     res.status(400).send('New users must have a name.');
    // }
    res.send('Successful POST request returning a JSON object with a new user\'s information');
})

app.put('/users/:id', (req, res) => {
    // const { id } = req.params;
    // const updatedUser = req.body; 

    // let user = users.find(user => user.id == id);

    // if (user){
    //     user.name = updatedUser.name;
    //     res.status(200).json(user);
    // } else {
    //     res.status(400).send('No user found');
    // }
    res.send('Successful PUT request returning a JSON object showing changes to User\'s account');
})

app.put('/users/:id/:movieTitle', (req, res) => {
    // const { id, movieTitle } = req.params;
     
    // let user = users.find(user => user.id == id);

    // if (user){
    //     user.favoriteMovies.push(movieTitle);
    //     res.status(200).send(`${movieTitle} has been added to User ${id}'s favorites list`);
    // } else {
    //     res.status(400).send('No user found');
    // }
    res.send('Successful PUT request returning a statement indicating a film has been added to a User\'s favorites list');
})

app.delete('/users/:id/:movieTitle', (req, res) => {
    // const { id, movieTitle } = req.params;
     
    // let user = users.find(user => user.id == id);

    // if (user){
    //     user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    //     res.status(200).send(`${movieTitle} has been removed from User ${id}'s favorites list`);
    // } else {
    //     res.status(400).send('No user found');
    // }
    res.send('A Successful DELETE request indicating that a film has been removed from a User\'s favorites list');
})

app.delete('/users/:id', (req, res) => {
    // const { id, movieTitle } = req.params;
     
    // let user = users.find(user => user.id == id);

    // if (user){
    //     users = user.filter(user => user.id != id);
    //     res.status(200).send(`User ${id} has been deleted`);
    // } else {
    //     res.status(400).send('No user found');
    // }
    res.send('A Successful DELETE request indicating that a User\'s account has been deleted');
})

app.get('/', (req, res) => {
    res.send('Welcome to FlixTrix, the app to keep track of your favorite movies!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oops, something broke!');
});

app.listen(8080, () => {
    console.log('This app is listening on port 8080');
});