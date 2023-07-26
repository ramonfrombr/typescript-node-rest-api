import express from 'express';
import { criarUsuario, selecionarUsuarioPeloEmail } from '../db/usuarios';
import { aleatorio, autenticacao } from '../auxiliares';

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