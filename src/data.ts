import { Drawing } from './types';

export const DRAWINGS: Drawing[] = [
  {
    id: 'C-Washer',
    name: 'C-Washer',
    category: 'Part Design',
    difficulty: 'Beginner',
    time: '5 min',
    image: '/images/C-Washer.jpg',
    videoUrl: 'https://www.youtube.com/embed/PC2jCcPw_jE?si=sRvard80wTca8BGD', // C-Washer tutorial
    description: 'A simple C-Washer modeling exercise designed for beginners in CATIA V5. This project helps you practice Sketcher, constraints, Pad, and Pocket features while creating a common mechanical component used in engineering assemblies.',
    tools: ['Sketcher', 'Pad', 'Mirror', 'Hole'],
    downloadUrl: '/images/C-Washer.jpg',
    catPartUrl: '/part/C-Washer.CATPart'
  },
  {
    id: 'flange-coupling',
    name: 'Flange Coupling',
    category: 'Assembly Design',
    difficulty: 'Intermediate',
    time: '25 min',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A standard coupling interface for connecting two shafts. Heavy use of Circular Pattern tool.',
    tools: ['Pad', 'Hole', 'Circular Pattern', 'Mirror'],
    downloadUrl: '#',
    catPartUrl: '#',
    isComingSoon: true
  },
  
  {
    id: 'turbine-blade',
    name: 'Gas Turbine Blade',
    category: 'Surface Design',
    difficulty: 'Advanced',
    time: '120 min',
    image: 'https://images.unsplash.com/photo-159742324403d-11973ef0662f?auto=format&fit=crop&q=80&w=800',
    videoUrl: '',
    description: 'Advanced surface modeling and twisted geometry. Coming soon to the library.',
    tools: ['Generative Shape Design', 'Loft', 'Sweep'],
    downloadUrl: '#',
    catPartUrl: '#',
    isComingSoon: true
  },
  {
    id: 'differential-housing',
    name: 'Differential Housing',
    category: 'Assembly Design',
    difficulty: 'Advanced',
    time: '150 min',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    videoUrl: '',
    description: 'Complex assembly housing with intricate internal cavities. Coming soon.',
    tools: ['Part Design', 'Boolean Operations', 'Advanced Fillets'],
    downloadUrl: '#',
    catPartUrl: '#',
    isComingSoon: true
  }
];

export const CATEGORIES = [
  'All',
  'Part Design',
  'Assembly Design',
  'Surface Design',
  'Sheet Metal',
  'Drafting',
  'Kinematics'
];
