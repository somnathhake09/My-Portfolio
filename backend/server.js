require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');
const connectDB  = require('./config/database');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use('/api', rateLimit({ windowMs: 15*60*1000, max: 200 }));

app.use('/api/about',    require('./routes/about'));
app.use('/api/skills',   require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact',  rateLimit({ windowMs:60*60*1000, max:10 }), require('./routes/contact'));

app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const states = ['disconnected','connected','connecting','disconnecting'];
  res.json({ ok:true, db: states[mongoose.connection.readyState], time: new Date() });
});

app.use((err, req, res, next) => res.status(500).json({ success:false, message:err.message }));

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () =>
  console.log(`\n🚀  Backend running → http://localhost:${PORT}\n✅  Health check  → http://localhost:${PORT}/api/health\n`)
));
