const userModel = require("../models/user.js");
const jwt = require("jsonwebtoken");

const expirationInSeconds = 86400;

secret = "segredoJobsity";

function createToken(req, res) {    
    userModel.findOne({
            raw: true, 
            where: { email: req.body.email }
        })
    .then((result) => {
        if (req.body.password !== result.password) {
            return res.status(400).json({ message: "Check credentials, email or password are incorrect!"});
        }

        const token = generateAccessToken({ id: result.id, role: result.role});
        res.status(200).json(token);
    })
    .catch(() => res.status(404).json({ message:"User not Found!" }));
}


function generateAccessToken(data) {
    return jwt.sign(data, secret, { expiresIn: expirationInSeconds });
}

function verifyAccessToken(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(" ") : null;

    if (!token) return res.status(401).json({ message: "Access denied. Check the access token." });

    jwt.verify(token[1], secret, function(err, info) {
        if (err) return res.status(500).json({ message: "Token invalid or expired!" });
        req.user = {
            id: info.id,
            role: info.role
        };
        next();
    });        

}

module.exports = {
    createToken,
    verifyAccessToken
};

