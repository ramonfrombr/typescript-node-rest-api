import express from 'express';
import { criarUsuario, selecionarUsuarioPeloEmail } from '../db/usuarios';
import { aleatorio, autenticacao } from '../auxiliares';

export const entrar = async (pedido: express.Request, resposta: express.Response) => {
    try {
        const {email, senha} = pedido.body;

        if (!email || !senha) {
            return resposta.sendStatus(400);
        }

        const usuario = await selecionarUsuarioPeloEmail(email).select('+autenticacao.salt +autenticacao.senha');

        if (!usuario) {
            return resposta.sendStatus(400);
        }

        const supostaSenha = autenticacao(usuario.autenticacao.salt, senha);

        if (usuario.autenticacao.senha !== supostaSenha) {
            return resposta.sendStatus(403);
        }

        const salt = aleatorio();

        usuario.autenticacao.sessaoToken = autenticacao(salt, usuario._id.toString());

        await usuario.save();

        resposta.cookie(
            'RAMON-AUTH', usuario.autenticacao.sessaoToken,
            { domain: 'localhost', path: '/'}
        );

        return resposta.status(200).json(usuario).end();
    } catch (erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}

export const registrar = async (pedido: express.Request, resposta: express.Response) => {
    try {
        const {email, senha, nome_usuario} = pedido.body;

        if (!email || !senha || !nome_usuario) {
            return resposta.sendStatus(400);
        }

        const usuarioExistente = await selecionarUsuarioPeloEmail(email);

        if(usuarioExistente) {
            return resposta.sendStatus(400);
        }

        const salt = aleatorio();

        const usuario = await criarUsuario({
            email,
            nome_usuario,
            autenticacao: {
                salt,
                senha: autenticacao(salt, senha)
            }
        });

        return resposta.status(200).json(usuario).end();
    } catch(erro) {
        console.log(erro);
        return resposta.sendStatus(400);
    }
}