export type Category = 
  | 'All'
  | 'Part Design'
  | 'Assembly Design'
  | 'Surface Design'
  | 'Sheet Metal'
  | 'Drafting'
  | 'Kinematics';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Drawing {
  id: string;
  name: string;
  category: string;
  difficulty: Difficulty;
  time: string;
  image: string;
  videoUrl: string;
  description: string;
  tools: string[];
  downloadUrl: string;
  catPartUrl: string;
  isComingSoon?: boolean;
}
