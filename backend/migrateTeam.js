const mongoose = require('mongoose');
const About = require('./models/About');

const teamData = [
  {
    name: 'Prabhu',
    role: 'CEO/Founder',
    image: '/images/Prabhu.png',
    color: '#FF1744'
  },
  {
    name: 'Santhosh',
    role: 'General Manager',
    image: '/images/Santhosh.png',
    color: '#E040FB'
  },
  {
    name: 'Vikashini',
    role: 'Deputy Manager',
    image: '/images/Vikashini.png',
    color: '#00E5FF'
  },
  {
    name: 'Manikandan',
    role: 'Team Lead',
    image: '/images/Manikandan.png',
    color: '#39FF14'
  },
  {
    name: 'Ganesh',
    role: 'Sr.Associate',
    image: '/images/Ganesh.png',
    color: '#FF00E6'
  },
  {
    name: 'Rahul',
    role: 'Sr.Associate',
    image: '/images/Rahul.png',
    color: '#76FF03'
  },
  {
    name: 'Partheesh',
    role: 'Associate',
    image: '/images/Partheesh.png',
    color: '#00D9FF'
  },
  {
    name: 'Alfiya',
    role: 'Executive',
    image: '/images/Alfiya.png',
    color: '#FFD700'
  },
  {
    name: 'Balaji',
    role: 'Executive',
    image: '/images/Balaji.png',
    color: '#00F0FF'
  },
  {
    name: 'Mufeez',
    role: 'Executive',
    image: '/images/Mufeez.png',
    color: '#FF6B35'
  },
  {
    name: 'Maheshwari',
    role: 'Executive',
    image: '/images/mahesh.png',
    color: '#FFEA00'
  }
];

mongoose.connect('mongodb+srv://thecoimbatoremedia_db_user:DPALYAh6IW9ZRmiq@thecoimbatoremedia.9kic2yr.mongodb.net/?appName=thecoimbatoremedia').then(async () => {
  console.log('Connected');
  const about = await About.findOneAndUpdate(
    {},
    { team: teamData },
    { upsert: true, new: true }
  );
  console.log('Migrated team data');
  mongoose.disconnect();
}).catch(err => console.error(err));