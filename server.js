const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/email-validator', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const emailSchema = new mongoose.Schema({
    email: String,
    id: String
});

const Email = mongoose.model('Email', emailSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', async function(req, res) {
    const email = req.body.email;

    if (!email.endsWith('@xyz.com')) {
        return res.json({ error: 'Email id is not part of the xyz domain' });
    }

    const existingEmail = await Email.findOne({ email: email });

    if (existingEmail) {
        return res.json({ error: 'You cannot generate the ID again from this email ID' });
    }

    const id = generateId();
    const newEmail = new Email({ email: email, id: id });
    await newEmail.save();

    res.json({ id: id });
});

function generateId() {
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
}

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});
