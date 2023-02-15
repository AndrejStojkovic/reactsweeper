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

export const colors: string[] = [
  '0000fd',   // 1. blue
  '017e00',   // 2. green
  'ff0000',   // 3. red
  '010080',   // 4. dark blue
  '810101',   // 5. dark red
  '008080',   // 6. cyan
  '000000',   // 7. black
  '808080',   // 8. gray
]