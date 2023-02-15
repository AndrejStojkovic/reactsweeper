export const getHighscoreLocalStorage = () => {
  return localStorage.getItem('highscore');
}

export const setHighscoreLocalStorage = (value: string) => {
  localStorage.setItem('highscore', value);
}

export const getPlayCounterLocalStorage = () => {
  return localStorage.getItem('play-counter');
}

export const setPlayCounterLocalStorage = (value: string) => {
  localStorage.setItem('play-counter', value);
}
