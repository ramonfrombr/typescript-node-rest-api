import express from 'express';

import {selecionarTodosUsuarios} from '../controladores/usuarios';

export default (rotas: express.Router) => {
    rotas.get('/usuarios', selecionarTodosUsuarios);
}