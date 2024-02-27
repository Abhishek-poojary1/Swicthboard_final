const nodemailer = require("nodemailer");

const sendfiles = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhishek@smartbuildauto.com",
      pass: "Poojary@abhi1",
    },
  });

  let mailOptions = {
    from: "ap2867045@gmail.com",
    to: "poojaryabhishek26@gmail.com",
    subject: "Email with attachment setting",
    text: "welll come ",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error occurred: " + error);
    } else {
      console.log("email sent successfully to " + info.response);
    }
  });
};

sendfiles();
