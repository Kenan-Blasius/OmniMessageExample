const OmniMessage = require('omni-message');
const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;

app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/contact', (req, res) => {
    const omniMessage = new OmniMessage();
    omniMessage.setTitle(req.body.subject);
    omniMessage.setContent(`Name: ${req.body.name}\nSurname: ${req.body.surname}\nEmail: ${req.body.email}\nMessage: ${req.body.content}`);

    // omniMessage.setMailUse(process.env.USE_MAIL);
    // omniMessage.setMailTo(process.env.MAIL_RECEIVER);
    // omniMessage.setMailService(process.env.MAIL_SERVICE);
    // omniMessage.setMailUser(process.env.MAIL_USER);
    // omniMessage.setMailPass(process.env.MAIL_PASS);
    omniMessage.setMailVariables({
        use: process.env.USE_MAIL,
        to: process.env.MAIL_RECEIVER,
        mailService: process.env.MAIL_SERVICE,
        mailUser: process.env.MAIL_USER,
        mailPass: process.env.MAIL_PASS
    });

    // omniMessage.setDiscordUse(process.env.USE_DISCORD);
    // omniMessage.setDiscordWebhookURL(process.env.DISCORD_WEBHOOK_URL);
    omniMessage.setDiscordVariables({
        use: process.env.USE_DISCORD,
        webhookURL: process.env.DISCORD_WEBHOOK_URL
    });

    omniMessage.sendAll()
        .then(() => {
            res.status(200).send('Message sent successfully');
        })
        .catch((error) => {
            console.error("Error from catch sendAll: " + error);
            res.status(500).send('Something went wrong while sending the message');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});