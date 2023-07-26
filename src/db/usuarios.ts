import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nome_usuario: {type: String, required: true},
    email: {type: String, required: true},
    autenticacao: {
        senha: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessaoToken: {type: String, select: false},
    },
})

export const UsuarioModelo = mongoose.model('Usuario', UsuarioSchema)

export const selecionarUsuarios = () => UsuarioModelo.find();
export const selecionarUsuarioPeloEmail = (email: string) => UsuarioModelo.findOne({email});
export const selecionarUsuarioPeloToken = (sessaoToken: string) => UsuarioModelo.findOne({'autenticacao.sessaoToken': sessaoToken})
export const selecionarUsuarioPeloId = (id: string) => UsuarioModelo.findById(id);
export const criarUsuario = (dados: Record<string, any>) => new UsuarioModelo(dados).save().then((usuario) => usuario.toObject());
export const apagarUsuarioPeloId = (id: string) => UsuarioModelo.findOneAndDelete({_id: id});
export const atualizarUsuarioPeloId = (id: string, dados: Record<string, any>) => UsuarioModelo.findByIdAndUpdate(id, dados)

