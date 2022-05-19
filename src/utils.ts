export const calcAcc = (n50: number, n100: number, n300: number, nmiss: number) => {
  let totalHits = n50 + n100 + n300 + nmiss;
  let totalScore = totalHits * 300;

  let userScore = (n50 * 50) + (n100 * 100) + (n300 * 300);

  return ((userScore / totalScore) * 100).toFixed(2);
}
