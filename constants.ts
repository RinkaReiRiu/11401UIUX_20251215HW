import { Difficulty, ResourceType, Tutorial, Resource, CommunityPost } from './types';

export const SOFTWARE_TOOLS = ['After Effects', 'Blender', 'Cinema 4D', 'DaVinci Resolve', 'Premiere Pro'];

export const MOCK_TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Cyberpunk City Compositing',
    description: 'Learn how to integrate 3D assets into real footage to create a stunning cyberpunk street scene using After Effects and Blender.',
    thumbnail: 'https://picsum.photos/800/450?random=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    author: 'NeoVFX',
    difficulty: Difficulty.Advanced,
    duration: '45 min',
    software: ['After Effects', 'Blender'],
    views: 12500,
    date: '2023-10-15',
    chapters: [
      { title: 'Introduction & Setup', timestamp: '00:00' },
      { title: 'Camera Tracking', timestamp: '05:30' },
      { title: 'Blender Scene Setup', timestamp: '12:45' },
      { title: 'Compositing in AE', timestamp: '28:20' },
      { title: 'Color Grading', timestamp: '40:10' }
    ],
    content: `
# Creating a Cyberpunk Atmosphere

In this tutorial, we dive deep into the workflow of combining 3D elements with live-action footage.

## Key Steps
1. **Camera Tracking**: Ensure your solve error is below 0.5 pixels.
2. **Lighting Match**: Use an HDRI that matches your footage location.
3. **Z-Depth Pass**: Essential for realistic fog and depth of field.

> "The secret to realism is imperfection. Add grain, lens distortion, and chromatic aberration."
    `
  },
  {
    id: '2',
    title: 'Fluid Simulations for Beginners',
    description: 'Start your journey into liquid physics. We cover the basics of domain settings, viscosity, and mesh generation.',
    thumbnail: 'https://picsum.photos/800/450?random=2',
    videoUrl: '',
    author: 'LiquidArt',
    difficulty: Difficulty.Beginner,
    duration: '20 min',
    software: ['Blender'],
    views: 8900,
    date: '2023-11-02',
    chapters: [
      { title: 'Domain Basics', timestamp: '00:00' },
      { title: 'Inflow vs Geometry', timestamp: '04:00' },
      { title: 'Baking the Mesh', timestamp: '15:00' }
    ],
    content: "Fluid simulations can be intimidating..."
  },
  {
    id: '3',
    title: 'Neon Glow Text Effects',
    description: 'Create realistic neon signs that flicker and buzz. No third-party plugins required.',
    thumbnail: 'https://picsum.photos/800/450?random=3',
    videoUrl: '',
    author: 'GlowMaster',
    difficulty: Difficulty.Intermediate,
    duration: '15 min',
    software: ['After Effects'],
    views: 34000,
    date: '2023-09-20',
    chapters: [],
    content: "Neon is a staple of motion graphics..."
  },
  {
    id: '4',
    title: 'Advanced Color Grading',
    description: 'Master the color warper and HDR wheels in DaVinci Resolve.',
    thumbnail: 'https://picsum.photos/800/450?random=4',
    videoUrl: '',
    author: 'ColoristPro',
    difficulty: Difficulty.Advanced,
    duration: '55 min',
    software: ['DaVinci Resolve'],
    views: 5600,
    date: '2023-12-01',
    chapters: [],
    content: "Color grading tells the emotional story..."
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Cinematic LUT Pack Vol. 1',
    type: ResourceType.Preset,
    fileSize: '50 MB',
    downloads: 1200,
    thumbnail: 'https://picsum.photos/400/300?random=10',
    author: 'FilmLook',
    price: 'Free'
  },
  {
    id: '2',
    title: '4K Dust & Scratches Overlays',
    type: ResourceType.StockFootage,
    fileSize: '2.5 GB',
    downloads: 850,
    thumbnail: 'https://picsum.photos/400/300?random=11',
    author: 'OverlayKing',
    price: 15
  },
  {
    id: '3',
    title: 'Sci-Fi HUD Interface Kit',
    type: ResourceType.ProjectFile,
    fileSize: '300 MB',
    downloads: 3000,
    thumbnail: 'https://picsum.photos/400/300?random=12',
    author: 'TechMotion',
    price: 25
  },
  {
    id: '4',
    title: 'Concrete Texture Mega Pack',
    type: ResourceType.Texture,
    fileSize: '1.2 GB',
    downloads: 400,
    thumbnail: 'https://picsum.photos/400/300?random=13',
    author: 'TextureHaven',
    price: 'Free'
  }
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: '1',
    author: 'Alice V.',
    avatar: 'https://picsum.photos/50/50?random=20',
    image: 'https://picsum.photos/600/600?random=21',
    title: 'My first attempt at camera tracking!',
    description: 'The slip was hard to fix, but I think the final composite looks okay. Any feedback on the shadows?',
    likes: 45,
    comments: 12,
    tags: ['#tracking', '#vfx', '#student'],
    date: '2 hours ago'
  },
  {
    id: '2',
    author: 'Bob The Builder',
    avatar: 'https://picsum.photos/50/50?random=22',
    image: 'https://picsum.photos/600/400?random=23',
    title: 'Procedural Alien Landscape',
    description: 'Generated entirely in Geometry Nodes. Will release the project file soon!',
    likes: 128,
    comments: 34,
    tags: ['#blender', '#geonodes', '#art'],
    date: '1 day ago'
  }
];