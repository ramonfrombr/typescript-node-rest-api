import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const servidor  = http.createServer(app);

servidor.listen(8080, () => {
    console.log("Servidor rodando no endereço http://localhost:8080/")
})