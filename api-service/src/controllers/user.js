const userModel = require("../models/user.js");
const emailService = require('../utils/emailService');
const { generatePassword, hashPassword } = require("../utils/utils");

async function createUser(req, res) {
    const newPassword = generatePassword(32);
    
    const newPasswordHash = await hashPassword(newPassword);

    userModel.create({
        email: req.body.email,
        password: newPasswordHash,
        role: req.body.role,
    })
    .then((result) => {
        res.status(200).json({
            "email" : result.email,
            "password": newPassword
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

async function resetPassword (req, res) {
    const user = await userModel.findOne({ raw: true, where: { email: req.body.email }});

    if (!user) {
        res.status(400).json('User not found!')
    }

    const newPassword = generatePassword(32);
    const newPasswordHash = await hashPassword(newPassword);

    await userModel.update({
        password: newPasswordHash,
    },
    {
        where: {
            email: req.body.email,
        },
    }
);

    await emailService.sendEmail(newPassword, req.body.email);

    res.status(200).json('Your new password was sent to your email adrress!');
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