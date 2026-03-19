const router = require('express').Router();
const About  = require('../models/About');

router.get('/', async (req, res) => {
  try {
    const data = await About.findOne();
    if (!data) return res.status(404).json({ success:false, message:'No about data. Run: npm run seed' });
    res.json({ success:true, data });
  } catch(e) { res.status(500).json({ success:false, message:e.message }); }
});

router.put('/', async (req, res) => {
  try {
    let data = await About.findOne();
    if (!data) data = await About.create(req.body);
    else { Object.assign(data, req.body); await data.save(); }
    res.json({ success:true, data });
  } catch(e) { res.status(400).json({ success:false, message:e.message }); }
});

module.exports = router;
