const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});


app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome to Cartub<br><br></h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service:'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });
  var maillist = [
    'contact@cartub.in','cartub.india@gmail.com'
  ];
  
  let mailOptions = {
    to: maillist,
    subject: "New Message Posted by Contact", // Subject line
    html: `<h4>There is a new message posted on the website by ${user.name} from email ${user.email}</h4>
    <h4> The message is  - ${user.message}</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}