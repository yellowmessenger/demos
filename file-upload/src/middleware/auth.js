const jwt = require("jsonwebtoken");


async function auth(req, res, next) {
    try {

        // check for request type if get then create token, post verify token        
        console.log(req.ip, "Request IP\n");
        console.log(req.connection.remoteAddress, "Request connection remote address\n");
        if (req.connection.socket)
            console.log(req.connection.socket.remoteAddress, "Request socket remoteAddres\n")
        console.log(req.headers['x-forwarded-for'], "Request x-forwarded-for\n")

        if (req.query.token) {
            req.token = req.query.token;
        }
        if (req.method === "GET" && req.path === "/upload" && !req.query.token) {
            // create token with expiresIn for 10 mins            
            let token = jwt.sign({ createdAt: new Date().toJSON() }, "yellow_messenger_2020", { expiresIn: 300 });
            req.token = token;
            console.log(token, "token created");
        }
        else if (req.method === "POST" && req.path === "/upload") {
            // verify token if expired throw error(timeout)            
            jwt.verify(req.body.token, "yellow_messenger_2020");
            console.log("token verified");
        }
        next();
    } catch (e) {
        console.log(e);
        res.status(400).render("response", {
            status: "error_timed_out",
            message: "Timed out. Please try again after some time."
        })
    }

}

module.exports = auth;