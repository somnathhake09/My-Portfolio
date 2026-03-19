const router     = require('express').Router();
const nodemailer = require('nodemailer');
const Contact    = require('../models/Contact');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message)
    return res.status(422).json({ success:false, message:'Name, email and message are required' });
  try {
    await Contact.create({ name, email, subject, message, ip: req.ip });
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const t = nodemailer.createTransport({ service:'gmail', auth:{ user:process.env.EMAIL_USER, pass:process.env.EMAIL_PASS } });
        await t.sendMail({ from:`"Portfolio" <${process.env.EMAIL_USER}>`, to:process.env.EMAIL_TO||process.env.EMAIL_USER, replyTo:email, subject:`New msg from ${name}`, html:`<h2>${name}</h2><p>${email}</p><p>${message}</p>` });
      } catch(e) { console.warn('Email failed (msg saved):', e.message); }
    }
    res.status(201).json({ success:true, message:"Message received! I'll reply soon." });
  } catch(e) { res.status(500).json({ success:false, message:e.message }); }
});

router.get('/', async (req, res) => {
  try { res.json({ success:true, data: await Contact.find().sort({createdAt:-1}) }); }
  catch(e) { res.status(500).json({ success:false, message:e.message }); }
});

module.exports = router;
