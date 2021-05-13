const dbConn = require("../databases/sqltest.js");
const User = dbConn.User;
const Blog = dbConn.Blog;

function login(req, res) {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)
    if (!(email && password))
        return res.render("login");
    else {
        User.findOne({
            where: {
                email: email,
            }
        })
            .then(userr => {
                if (userr) {
                    if (password !== userr.password) {
                        res.render("login")
                    }
                    console.log("use", userr.name);
                    console.log("email", userr.email);
                    const newUser = {
                        id: req.body.email,
                        name: userr.name,
                        userId: userr.id
                    };

                    req.session.user = newUser;
                    console.log(req.session.user);
                    return res.redirect('/');
                } else {
                    return res.redirect('/');
                }

            })
            .catch(err => {
                console.log(err)
                return res.redirect('/');
            })

    }
}


module.exports = { login: login }