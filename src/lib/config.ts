export type Difficulty = 'beginner' | 'intermediate' | 'expert';

export type IConfig = {
  [key in Difficulty]: {
    width: number,
    height: number,
    mines: number
  }
};

export const config: IConfig = {
  beginner: {
    width: 10,
    height: 10,
    mines: 10
  },
  intermediate: {
    width: 16,
    height: 16,
    mines: 40
  },
  expert: {
    width: 32,
    height: 32,
    mines: 128
  }
};