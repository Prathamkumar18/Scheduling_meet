const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'testmail854305@gmail.com',
    pass: 'mvsjrreydjafqcpy'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission and schedule email
app.post('/schedule-email', (req, res) => {
  const recipient = req.body.recipient;
  const scheduledTime = new Date(req.body.scheduledTime);

  const currentTime = new Date();
  const delay = scheduledTime.getTime() - currentTime.getTime();

  if (delay < 0) {
    return res.status(400).send('Invalid scheduled time');
  }

  setTimeout(() => {
    const mailOptions = {
      from: 'testmial854305@gmail.com',
      to: recipient,
      subject: 'Unitalk meet',
      text: 'Your meeting has been scheduled now.please join the meet.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }, delay);

  res.send('Meet scheduled successfully!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
