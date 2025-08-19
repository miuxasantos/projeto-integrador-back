import express from 'express';
import cors from 'cors';
import Routers from './routes/index.js';

const app = express();

var corOptions = {
    origin: 'https://localhost:3030',
    origin: 'http://localhost:5173',
    credentials: true
}

// middlewares

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routers
Routers(app);

// app.get('/', (req, res) => {
//     res.json({ message: 'hello world!'});
// })

const porta = process.env.porta || 3030;

app.listen(porta, () => {
    console.log(`Servidor rodando na porta: ${porta}`);
})