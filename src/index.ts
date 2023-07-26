import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {autenticacao} from './auxiliares'

dotenv.config();

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
    const senha_hash = autenticacao("abc", "123")
    console.log(senha_hash)
})

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_CREDENCIAL)
mongoose.connection.on('error', (erro: Error) => console.log(erro))