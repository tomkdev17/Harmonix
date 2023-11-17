const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path');

const app = express();

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
let topMovies = [
    {
        title: 'Kill Bill',
        director: 'Quentin Tarantino'
    },
    {
        title: 'The Godfather', 
        director: 'Francis Ford Coppola'
    },
    {
        title: 'It Follows',
        director: 'David Robert Mitchell'
    },
    {
        title: 'Gremlins',
        director: 'Joe Dante'
    },
    {
        title: 'Apocalypse Now',
        director: 'Francis Ford Coppola'
    },
    {
        title: 'The Other Side of the Wind',
        director: 'Orson Welles'
    },
    {
        title: 'À bout de souffle (Breathless)',
        director: 'Jean-Luc Godard'
    },
    {
        title: 'The Perfection',
        director: 'Richard Shepard'
    },
    {
        title: 'Whiplash',
        director: 'Damien Chazelle'
    },
    {
        title: 'Fight Club',
        director: 'David Fincher'
    }
]

// app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

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