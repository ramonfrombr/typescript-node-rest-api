import express from 'express';

import {get, merge} from 'lodash';

import { selecionarUsuarioPeloToken } from '../db/usuarios';

export const estaAutenticado = async (pedido: express.Request, resposta: express.Response, next: express.NextFunction) => {
    try {
        const sessaoToken = pedido.cookies['RAMON-AUTH'];

        if (!sessaoToken) {
            return resposta.sendStatus(403);
        }

        const usuarioExistente = await selecionarUsuarioPeloToken(sessaoToken);
        
        if (!usuarioExistente) {
            return resposta.sendStatus(403);
        }

        merge(pedido, {identity: usuarioExistente});

        return next();
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400)
    }
}