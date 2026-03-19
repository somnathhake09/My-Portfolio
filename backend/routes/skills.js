const router = require('express').Router();
const Skill  = require('../models/Skill');

router.get('/',     async (req, res) => { try { res.json({ success:true, data: await Skill.find().sort({order:1}) }); } catch(e) { res.status(500).json({ success:false, message:e.message }); } });
router.post('/',    async (req, res) => { try { res.status(201).json({ success:true, data: await Skill.create(req.body) }); } catch(e) { res.status(400).json({ success:false, message:e.message }); } });
router.put('/:id',  async (req, res) => { try { const d = await Skill.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json({ success:true, data:d }); } catch(e) { res.status(400).json({ success:false, message:e.message }); } });
router.delete('/:id', async (req, res) => { try { await Skill.findByIdAndDelete(req.params.id); res.json({ success:true }); } catch(e) { res.status(500).json({ success:false, message:e.message }); } });

module.exports = router;
