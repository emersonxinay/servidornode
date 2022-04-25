
const User = require('../models/user');
const Rol = require('../models/rol');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage  = require('../utils/cloud_storage');

module.exports = {
    async getAll (req, res, next){
        try {
            const data = await User.getAll(); 
            console.log(`usuarios: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },
    async register(req, res, next){
        try {
            const user = req.body;
            const data = await User.create(user);

            await Rol.create(data.id, 1); //se creo un roll por defecto (CLIENTE)

            return res.status(201).json({
                success: true,
                message: 'el registro se realizo correctamente, ahora inicia sessión',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'hubo un error con el registro del usuario',
                error: error
            });
        }
    },
    async registerWithImage(req, res, next){
        try {
            const user = JSON.parse(req.body.user);
            console.log(`datos enviados del usuario: ${user}`);
            const files = req.files;
            if (files.length > 0 ) {
                const pathImage = `image_${Date.now()}` // nombre del archivo que se almacenara
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            const data = await User.create(user);

            await Rol.create(data.id, 1); //se creo un roll por defecto (CLIENTE)

            return res.status(201).json({
                success: true,
                message: 'el registro se realizo correctamente, ahora inicia sessión',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'hubo un error con el registro del usuario',
                error: error
            });
        }
    },
    async login(req, res, next){
        try {
            const email = req.body.email;
            const password = req.body.password;
            const myUser = await User.findByIdEmail(email);

            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'el email  no fue encontrado'
                });
            }
            if (User.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {
                    // expiresIn: (60*60*24) // 1 hora de tiempo de inicio 
                });
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }
                console.log(`Usuario Enviado ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'el usuario a sido autenticado'
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'la constraseña no es correcta'
                });
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'hay errores de codigo',
                error: error
            });
        }
    }
};
