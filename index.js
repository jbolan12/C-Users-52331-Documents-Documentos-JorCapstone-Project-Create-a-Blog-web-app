import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Optionally set the views directory

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let posts = [];


app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);  
    res.redirect('/');     
});


app.get('/edit/:id', (req, res) => {
    const postIndex = req.params.id;
    const post = posts[postIndex];
    res.render('edit', { postIndex, post });
});


app.post('/edit/:id', (req, res) => {
    const postIndex = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts[postIndex] = updatedPost;
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
