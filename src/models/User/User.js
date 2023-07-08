const { where } = require('sequelize');
const dataBase = require('../../../config/db');
const UserSchema = require('../schemas/user');
const bcrypt = require('bcrypt');

class User {

    results = [];
    userExists = [];
    passwordHash = '';
    

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
    
            return {success: true, msg: `O usuário(a) criado com sucesso.`};
        } catch (error) {
            return {erro: error, msg: `Erro ao criar o usuário.`};
        }
    }

    async updateUserDB(user_id, user_nome, user_sobrenome, user_foto) {
        try {
            await UserSchema.update({
                user_nome: user_nome,
                user_sobrenome: user_sobrenome,
                user_foto: user_foto
            },
            {where: {user_id: user_id}}
            );

            return true;
        } catch (error) {
            return {erro: error, msg: `Erro ao atualizar o usuário.`};
        }
    }

    async disableUserDB(user_id) {
        try {
            await UserSchema.update({
                user_ativo: 'N'
            },
            {where: {user_id: user_id}}
            );

            return true;
        } catch (error) {
            return {erro: error, msg: `Erro ao desabilitar o usuário.`};
        }
    }

    async deleteUserDB(user_id) {
        try {
            await UserSchema.destroy({
                where: {
                    user_id: user_id
                },
                force: true
            });

            return true
        } catch (error) {
            return {erro: error, msg: `Erro ao excluir o usuário`};
        }
    }

    async allUsersDB() {
        try {
            this.results = await UserSchema.findAll({
                order: [
                    ['user_date_create', 'ASC']
                ]
            });

            return this.results;
        } catch(error) {
            return {erro: error, msg: `Erro ao buscar os usuários.`};
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
            return {erro: error, msg: `Erro ao verificar e-mail existente.`}
        }
    }

    async encodePassword(password) {
        try {
            const hash = await bcrypt.hash(password, 10);
            return hash
        } catch (error) {
            throw new Error(`Erro ao codificar a senha: ${error}`);
        }
    }

    async searchPasswordUserDB(user_email) {
        try {
            const result = await UserSchema.findAll({
                attributes: ['user_password'],
                where: {user_email: user_email}
            });

            return result;
        } catch (error) {
            return {erro: error, msg: `Erro ao buscar o usuário`};
        }
    }

    async decodePassword(req_password, hash) {
        try {
            const result = await bcrypt.compare(req_password, hash);
            return result;
        } catch (error) {
            return {erro: error, msg: `Erro ao decodificar senha.`};
        }
    }

    async userLoginDB(user_email, user_password) {
        const searchPasswordUser = this.searchPasswordUserDB(user_email);
        const passwordHash = this.decodePassword(user_password, searchPasswordUser);

        if(passwordHash) {
            try {
                const user = await UserSchema.findAll({
                    attributes: [user_email],
                    where: {
                        user_ativo: 'S'
                    }
                });
                return user;
            } catch (error) {
                return {erro: error, msg: `Erro ao realizar o login.`}
            }
        }
    }
}

module.exports = User;