export function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function leadingZeroes(n: number, len: number) {
  return String(n).padStart(len, '0');
}