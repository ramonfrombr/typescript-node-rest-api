import crypto from 'crypto';
const CHAVE_SECRETA = "RAMON-REST-API";

export const aleatorio = () => crypto.randomBytes(128).toString('base64');

// Usa a senha, o salt, e a chave secreta para criar uma função que auxilia no processo de autenticação
export const autenticacao = (salt: string, senha: string) => {
    return crypto.createHmac('sha256', [salt, senha].join('/')).update(CHAVE_SECRETA).digest('hex');
}

