import express from 'express';

import { apagarUsuarioPeloId, selecionarUsuarioPeloId, selecionarUsuarios } from '../db/usuarios';

export const selecionarTodosUsuarios = async (pedido: express.Request, resposta: express.Response) => {
    try {
        const usuarios = await selecionarUsuarios();

        return resposta.status(200).json(usuarios);
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}


export const apagarUsuario = async (pedido: express.Request, resposta: express.Response) => {
    try {
        const {id} = pedido.params;

        const usuarioApagado = await apagarUsuarioPeloId(id);

        return resposta.json(usuarioApagado);
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}

export const atualizarUsuario = async (pedido: express.Request, resposta: express.Response) => {
    try {
        const {id} = pedido.params;
        const {nome_usuario} = pedido.body;

        if (!nome_usuario) {
            return resposta.sendStatus(400);
        }

        const usuario = await selecionarUsuarioPeloId(id);

        usuario.nome_usuario = nome_usuario;
        await usuario.save();

        return resposta.status(200).json(usuario).end();
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400)
    }
}