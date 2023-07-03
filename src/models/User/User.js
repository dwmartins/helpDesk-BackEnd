const dataBase = require('../../../config/db');
const User = require('../schemas/user');

dataBase.sync();

class User {
    async createNewUser(user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_date_create, user_foto) {
        try {
            await User.create({
                user_nome: user_nome,
                user_sobrenome: user_sobrenome,
                user_email: user_email,
                user_password: user_password,
                user_tipo: user_tipo,
                user_ativo: user_ativo,
                user_date_create: user_date_create,
                user_foto: user_foto
            });
    
            return {success: true, message: `Usuário criado com sucesso.`};
        } catch (error) {
            return {success: false, message: `Erro ao criar o usuário.`};
        }
    }
}

module.exports = User;