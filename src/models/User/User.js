const dataBase = require('../../../config/db');
const UserSchema = require('../schemas/user');

class User {
    async createNewUser(user_nome, user_sobrenome, user_email, user_password, user_tipo, user_ativo, user_foto) {
        try {
            await UserSchema.create({
                user_nome: user_nome,
                user_sobrenome: user_sobrenome,
                user_email: user_email,
                user_password: user_password,
                user_tipo: user_tipo,
                user_ativo: user_ativo,
                user_date_create: new Date(),
                user_foto: user_foto
            });
    
            return {success: true, message: `Usuário criado com sucesso.`};
        } catch (error) {
            return {success: false, message: `Erro ao criar o usuário. ${error}`};
        }
    }
}

module.exports = User;