import express from 'express';

import {apagarUsuario, atualizarUsuario, selecionarTodosUsuarios} from '../controladores/usuarios';
import { estaAutenticado, proprioUsuario } from '../middlewares';

export default (rotas: express.Router) => {
    rotas.get('/usuarios', estaAutenticado, selecionarTodosUsuarios);
    rotas.delete('/usuarios/:id', estaAutenticado, proprioUsuario, apagarUsuario);
    rotas.patch('/usuarios/:id', estaAutenticado, proprioUsuario, atualizarUsuario);
}
