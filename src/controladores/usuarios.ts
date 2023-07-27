import express from 'express';

import { selecionarUsuarios } from '../db/usuarios';

export const selecionarTodosUsuarios = async (pedido: express.Request, resposta: express.Response) => {
    try {
        const usuarios = await selecionarUsuarios();

        return resposta.status(200).json(usuarios);
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}