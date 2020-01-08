const express = require("express");
const request = require("request-promise");
const app = express();
const port = process.env.PORT || 3000;
const multer = require("multer");
const sharp = require("sharp");
const hbs = require("hbs");
const path = require("path");
const Request = require("./utils/api")
const auth = require("./middleware/auth");


var partialsPath = path.join(__dirname, "/templates/partials");
var viewsPath = path.join(__dirname, "./templates/views");
var publicDirPath = path.join(__dirname, "../public");
hbs.registerPartials(partialsPath);
hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

app.use(express.static(publicDirPath));
app.set("view engine", "hbs");
app.set("views", viewsPath)


const upload = multer({
    //dest: 'images', // dest for file uploads
    limits: {
        fileSize: 2 * Math.pow(10, 6) // 2MB
    },
    fileFilter(req, file, cb) {
        //cb(new Error()), cb(undefined,true) accept upload, cb(undefined,false) reject upload
        // regex for  matching file ext /\.(pdf|jpg|png|jpeg)$/gi
        console.log(file, "in filer");
        let reg = /\.(pdf|jpg|png|jpeg)$/gi;
        if (!(file && file.originalname.match(reg))) {
            return cb(new Error("File is not supported"));
        }
        cb(undefined, true);

    }
})

app.use(express.json());


app.get("", (req, res) => {
    res.send("go to /upload for uploading file");
})

// declare route for file upload, register multer middleware
// form key must match with arg to upload.single
/*req.file: {
    fieldname: 'upload',
    originalname: 'philly.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'images',
    filename: 'de13b5b35f11d1831003a451e7cbc23b',
    path: 'images/de13b5b35f11d1831003a451e7cbc23b',
    size: 420282
  }
  */

app.post("/upload", upload.single('upload'), auth, async (req, res) => {

    //resize using sharp
    // let buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    let extension = req.file.originalname.split(".");
    extension = extension[extension.length - 1];
    let { doc_type, campaign } = req.body;
    console.log(doc_type, campaign, extension);
    // available when dest is not set in mult options
    const base64 = req.file.buffer.toString('base64');
    console.log(base64.substring(0, 100));

    res.render("response", {
        status: "success", message: "File uploaded successfully", base64, extension, doc_type, campaign
    })

}, (e, req, res, next) => {

    res.status(400).render("response", {
        status: "error",
        message: e.message,
        try_again: `/upload?doc_type=${req.body.doc_type}&campaign=${req.body.campaign}&token=${req.body.token}`
    })
})


app.get("/upload", auth, async (req, res) => {
    res.render('index', { ...req.query, token: req.token });
})


app.get("/test", async (req, res) => {

    let { doc_type, campaign } = req.query;
    console.log(doc_type, campaign);

    try {

        let token = await request(Request.AUTH_API);

        let access_token = token.access_token;

        let requestData = {
            Timestamp: new Date(new Date().getTime() + 19800000).toLocaleString(), // 
            source_channel: "Yellow Messenger",
            doc_type: doc_type,
            unique_id: "abcd1234",
            org_name: "SFDC",
            bot_id: "x1574150820620",
            campaign: campaign,
            conversation_id: "abcd1234",
            doc_ext: "extension"
        }

        let encryptedRequestData = Request.encrypt(JSON.stringify(requestData));
        Request.UPLOAD_API.headers.Authorization += access_token;
        Request.UPLOAD_API.data.dataBody = encryptedRequestData;
        let response = await request(Request.UPLOAD_API);
        res.send(response);
    }
    catch (e) {
        console.log(e, "error");
        res.status(400).send({ error: e });
    }
})

app.get("/404", (req, res) => {

    res.status(404).render("404");
})

app.get("*", (req, res) => {
    res.status(400).send({ error: 404 });
})

app.listen(port, () => {
    console.log(`Server is listentning on ${port}`);
})


/*

<image src = "data:image/jpg;base64,___data___"
*/