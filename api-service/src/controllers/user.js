const userModel = require("../models/user.js");
const emailService = require('../utils/emailService');
const { generatePassword } = require("../utils/utils");

function createUser(req, res) {
    userModel.create({
        email: req.body.email,
        password: generatePassword(),
        role: req.body.role,
    })
    .then((result) => {
        res.status(200).json({
            "email" : result.email,
            "password": result.password
        })
    })
    .catch((error) => {
        let message = error;
        if (error.name) {
            switch(error.name) {
                case "SequelizeUniqueConstraintError" :
                    message = "User already exists. Access email must be unique."
                break;
                case "SequelizeValidationError":
                    message = "Invalid email."    
                break;
                case "SequelizeDatabaseError":
                    message = "Invalid role. Only admin or user are accepted."    
                break;
            }
        }

        res.status(401).send({"message": message})    
    });
}


async function updateUser(req, res) {
    await userModel.update({
            email: req.body.email,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );

    userModel.findByPk(req.params.id).then((result) => res.json(result));
}

async function deleteUser(req, res) {
    await userModel.destroy({
        where: {
            id: req.params.id,
        },
    });

    userModel.findAll().then((result) => res.json(result));
}

function resetPassword (req, res) {   
    emailService.sendEmail().then(() => res.status(200).json('Nova senha enviada para sua caixa de email!'));
}

function findAll(req, res) {
    userModel.findAll().then((result) => res.json(result));
}

function findUser(req, res) {
    userModel.findByPk(req.params.id).then((result) => res.json(result));
}

module.exports = {
    findAll,
    updateUser,
    deleteUser,
    createUser,
    findUser,
    resetPassword
};