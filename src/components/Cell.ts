export type Cell = {
  isOpened?: boolean,
  type: 'mine' | 'empty',
  value: number,
  flagged: boolean,
  exploded: boolean,
  visited: boolean,
  onClick?: () => void
}