const jwt = require("jsonwebtoken");

const users = [
    {
        username: "admin",
        password: "123456",
        role: "Admin"
    },
    {
        username: "school",
        password: "123456",
        role: "School"
    },
    {
        username: "parent",
        password: "123456",
        role: "Parent"
    }
];

const login = async (req, res) => {

    const { username, password } = req.body;

    const user = users.find(
        u =>
            u.username === username &&
            u.password === password
    );

    if (!user) {

        return res.status(401).json({
            success: false,
            message: "Invalid Username or Password"
        });

    }

    const token = jwt.sign(

        {
            username: user.username,
            role: user.role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "1h"
        }

    );

    res.json({

        success: true,

        token,

        role: user.role

    });

};

module.exports = {
    login
};