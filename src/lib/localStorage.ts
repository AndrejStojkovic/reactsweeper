export const getHighscoreLocalStorage = () => {
  return localStorage.getItem('highscore');
}

export const setHighscoreLocalStorage = (value: string) => {
  localStorage.setItem('highscore', value);
}