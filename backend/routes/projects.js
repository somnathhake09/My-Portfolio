const router  = require('express').Router();
const Project = require('../models/Project');

router.get('/', async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = tag && tag !== 'All' ? { tags: { $in: [tag] } } : {};
    res.json({ success:true, data: await Project.find(filter).sort({order:1}) });
  } catch(e) { res.status(500).json({ success:false, message:e.message }); }
});
router.post('/',    async (req, res) => { try { res.status(201).json({ success:true, data: await Project.create(req.body) }); } catch(e) { res.status(400).json({ success:false, message:e.message }); } });
router.put('/:id',  async (req, res) => { try { const d = await Project.findByIdAndUpdate(req.params.id, req.body, {new:true}); res.json({ success:true, data:d }); } catch(e) { res.status(400).json({ success:false, message:e.message }); } });
router.delete('/:id', async (req, res) => { try { await Project.findByIdAndDelete(req.params.id); res.json({ success:true }); } catch(e) { res.status(500).json({ success:false, message:e.message }); } });

module.exports = router;
