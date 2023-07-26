import express from 'express';

import { entrar, registrar } from '../controladores/autenticacao';

export default (rotas: express.Router) => {
    rotas.post('/autenticacao/registrar', registrar)
    rotas.post('/autenticacao/entrar', entrar)
};