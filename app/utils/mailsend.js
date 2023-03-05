const mailConfig = require("../config/mail.config");
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
  mailConfig.apikey
);

const mailsend = async (mailtitle, tomail, url, description) => {
  try {
    await mailchimpClient.messages.send({
      message: {
        subject: mailtitle,
        from_email: mailConfig.domain,
        to: [
          {
            email: tomail,
            type: "to",
          },
        ],
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <h1>Hi there!</h1>      
          <div style="margin-bottom: 30px">${description}.</div>
          <a href="${url}" style="color: #fff;background-color: #61777f; text-decoration: none;padding: 10px 20px;border-radius: 20px;">Click Me</a>      
          <div>Thank you!</div>
        </body>
      </html>`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = mailsend;
