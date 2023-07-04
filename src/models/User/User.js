const dataBase = require('../../../config/db');
const UserSchema = require('../schemas/user');

class User {

    results = [];
    userExists = [];

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
    
            return {success: true, message: `O usuário(a) ${user_nome} foi criado com sucesso.`};
        } catch (error) {
            return {error: true, message: `Erro ao criar o usuário.`};
        }
    }

    async allUsersDB() {
        try {
            this.results = await UserSchema.findAll({
                order: [
                    ['user_date_creat', 'ASC']
                ]
            });

            return this.results;
        } catch(error) {
            return {error: true, message: `Erro ao buscar os usuários.`};
        }
    }

    async existingEmail(user_email) {
        try {
            this.userExists = await UserSchema.findAll({
                attributes: ['user_email'],
                where: {
                    user_email: user_email
                }
            });

            return this.userExists;

        } catch (error) {
            return {error: true, message: `Erro ao verificar e-mail existente.`}
        }
    }
}

module.exports = User;