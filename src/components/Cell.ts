export type Cell = {
  isOpened?: boolean,
  type: 'mine' | 'empty',
  value: number,
  flagged: boolean,
  onClick?: () => void
}

/*
type CellState = {
  isOpened?: boolean,
  type: 'mine' | 'empty',
  value: number,
}

class Cell extends React.Component<CellState> {
  state: CellState = {
    isOpened: false,
    type: 'empty',
    value: -1
  }
}

export default Cell;*/