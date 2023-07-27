import express from 'express';

import {get, merge} from 'lodash';

import { selecionarUsuarioPeloToken } from '../db/usuarios';

export const estaAutenticado = async (pedido: express.Request, resposta: express.Response, proximaFuncao: express.NextFunction) => {
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

        return proximaFuncao();
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400)
    }
}

export const proprioUsuario = async (pedido: express.Request, resposta: express.Response, proximaFuncao: express.NextFunction) => {
    try {
        const {id} = pedido.params;
        const usuarioAtualId = get(pedido, 'identity._id') as string;

        if (!usuarioAtualId) {
            return resposta.sendStatus(400);
        }

        if (usuarioAtualId.toString() !== id) {
            return resposta.sendStatus(403);
        }

        return proximaFuncao()
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}