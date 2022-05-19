import { Gamemode } from "./types/general";

export const calcAcc = (n50: number, n100: number, n300: number, katus: number, gekis: number, nmiss: number, mode: Gamemode) => {
  switch (mode) {
    case Gamemode.standart:
      var totalHits = n50 + n100 + n300 + nmiss;
      var totalScore = totalHits * 300;
    
      let userScore = (n50 * 50) + (n100 * 100) + (n300 * 300);
    
      return ((userScore / totalScore) * 100).toFixed(2);
    case Gamemode.catchTheBeat:
      var totalHits = n50 + n100 + n300;
      let misses = totalHits + katus;

      return (totalHits / misses * 100).toFixed(2);
    case Gamemode.taiko:
      var totalHits = n300 + (0.5 * n100);

      return (( totalHits / ( totalHits + n100 + nmiss ) ) * 100).toFixed(2);
    case Gamemode.mania:
      var totalHits = (300 * (n300 * gekis)) + (katus * 200) + (n100 * 100) + (n50 * 50);
      var totalScore = 300 * (gekis + n300 + katus + n100 + n50 + nmiss);

      return ((totalHits / totalScore) * 100).toFixed(2);
    default:
      "xd"
  }
}
