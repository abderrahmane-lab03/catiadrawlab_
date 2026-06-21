import { Drawing } from './types';

export const DRAWINGS: Drawing[] = [
  {
    id: 'C-Washer',
    name: 'C-Washer',
    category: 'Part Design',
    difficulty: 'Beginner',
    time: '5 min',
    image: '/images/C-Washer.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    description: 'A fundamental mechanical support bracket used in industrial assemblies. Focuses on Sketcher and Pad features.',
    tools: ['Sketcher', 'Pad', 'Mirror', 'Hole'],
    downloadUrl: '#',
    catPartUrl: '#'
  },
  {
    id: 'stepped-shaft',
    name: 'Stepped Transmission Shaft',
    category: 'Part Design',
    difficulty: 'Intermediate',
    time: '35 min',
    image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A precise shaft with multiple diameters for bearing fitment. Key focus on Shaft (Revolve) and Groove features.',
    tools: ['Shaft (Revolve)', 'Groove', 'Chamfer', 'Keyway'],
    downloadUrl: '#',
    catPartUrl: '#'
  },
  {
    id: 'spur-gear',
    name: 'Involute Spur Gear',
    category: 'Part Design',
    difficulty: 'Advanced',
    time: '60 min',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Complex gear geometry modeling using mathematical formulas for the involute curve.',
    tools: ['Formula', 'Law', 'Circular Pattern', 'Pocket'],
    downloadUrl: '#',
    catPartUrl: '#'
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
    id: 'connecting-rod',
    name: 'Engine Connecting Rod',
    category: 'Part Design',
    difficulty: 'Advanced',
    time: '90 min',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'High-performance mechanical component with complex ribbing and ergonomic transitions.',
    tools: ['Multi-sections Solid', 'Rib', 'Slot', 'Boolean Ops'],
    downloadUrl: '#',
    catPartUrl: '#'
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
