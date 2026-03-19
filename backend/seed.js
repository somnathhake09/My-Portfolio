require('dotenv').config();
const connectDB = require('./config/database');
const About   = require('./models/About');
const Skill   = require('./models/Skill');
const Project = require('./models/Project');

async function seed() {
  await connectDB();
  await Promise.all([About.deleteMany({}), Skill.deleteMany({}), Project.deleteMany({})]);
  console.log('🗑️  Old data cleared');

  await About.create({
    name: 'Somnath Hake',
    role: 'Student Developer',
    bio1: "I'm a passionate student with a love for technology and innovation. Currently pursuing my degree in Computer Science, I spend my time learning new technologies, building projects, and constantly pushing myself to grow.",
    bio2: 'I believe in the power of creativity and continuous learning to make a positive impact.',
    email: 'somnathhake09@gmail.com',
    phone: '+91 8767 75 0962',
    location: 'Old Sangvi, Pune-411027, Maharashtra',
    education: 'Bvoc (Software Development) Student',
    typingTexts: ['Developer', 'Creative Thinker', 'Problem Solver'],
  });
  console.log('✔  About inserted');

  await Skill.insertMany([
    { icon:'💻', title:'Web Development',  subtitle:'Building modern, responsive web apps', tags:['HTML','CSS','JavaScript','React'], percentage:85, order:1 },
    { icon:'⚙️', title:'Programming',      subtitle:'Core languages for backend & systems',  tags:['Python','Java','C++'],            percentage:80, order:2 },
    { icon:'🎨', title:'UI/UX Design',     subtitle:'Crafting intuitive user experiences',   tags:['Figma','Adobe XD','Canva'],       percentage:75, order:3 },
    { icon:'🔧', title:'Problem Solving',  subtitle:'Algorithms, logic & data structures',  tags:['DSA','Algorithms','OOP'],          percentage:90, order:4 },
    { icon:'🗄️', title:'Database',         subtitle:'Relational & NoSQL data management',   tags:['MySQL','MongoDB','PostgreSQL'],    percentage:70, order:5 },
    { icon:'🔗', title:'Version Control',  subtitle:'Collaborative development & CI/CD',    tags:['Git','GitHub','GitLab'],           percentage:85, order:6 },
  ]);
  console.log('✔  6 Skills inserted');

  await Project.insertMany([
    { emoji:'🎨', title:'Portfolio Website',   description:'A responsive personal portfolio showcasing my work and skills.', tags:['HTML','CSS','JavaScript'], btn1Label:'Live Demo', btn2Label:'GitHub', featured:true,  order:1 },
    { emoji:'📱', title:'Mobile App UI',       description:'Clean and intuitive mobile app interface design.',              tags:['Figma','UI/UX','Design'],   btn1Label:'View Design', btn2Label:'Case Study', order:2 },
    { emoji:'🤖', title:'AI Chatbot',          description:'Intelligent chatbot using Python and NLP.',                    tags:['Python','NLP','AI'],         btn1Label:'Try It', btn2Label:'GitHub', featured:true, order:3 },
    { emoji:'🛒', title:'E-Commerce Platform', description:'Full-stack e-commerce with payment integration.',              tags:['React','Node.js','MongoDB'],  btn1Label:'Live Demo', btn2Label:'GitHub', featured:true, order:4 },
    { emoji:'📊', title:'Data Visualization',  description:'Interactive dashboard for complex datasets.',                  tags:['D3.js','React','API'],        btn1Label:'View Demo', btn2Label:'GitHub', order:5 },
    { emoji:'🎮', title:'Game Development',    description:'2D platformer game built with Unity engine.',                  tags:['Unity','C#','Game Design'],   btn1Label:'Play Now', btn2Label:'GitHub', order:6 },
  ]);
  console.log('✔  6 Projects inserted');

  console.log('\n✅  Seed done! Atlas database is ready.\n');
  process.exit(0);
}

seed().catch(err => { console.error('❌ Seed failed:', err.message); process.exit(1); });
