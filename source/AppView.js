'use strict'

class AppView extends Sudoku {
   constructor () {
      super();
   }

   goToEasyLevel() {
      const getFront = document.getElementById('button-easy')
      console.log(getFront);
      getFront.addEventListener('mouseover', event => this.#clickCatcher(event, getFront, this.field))
   }

   #clickCatcher(event, element, field) {
      const getEasySudoku = this.getEasyLevelSudoku();
      console.log(getEasySudoku);
      const neededSudoku = getEasySudoku.partialSudoku;
      const fullSudoku = getEasySudoku.completedSudoku;
      for (const part of field) {
         for (const cell of part) {
            const cordX = cell.x;
            const cordY = cell.y;
            cell.number = neededSudoku[cordX][cordY];
            cell.numberAnswer = fullSudoku[cordX][cordY];
         }         
      }
      const ggg = this.mas();
      this.setParametrsSudoku(ggg.byu, ggg.empty)
      console.log(this.field);
   }

   mas() {
      const byu = [];
      const empty = [];
      for (let i = 0; i < 9; i++) {
         byu[i] = [];
         empty[i] = [];
      }
      console.log(this.field);
      for (const part of this.field) {
         for (const cell of part) {
            const cordX = cell.x;
            const cordY = cell.y;
            byu[cordX][cordY] = cell.numberAnswer;
            empty[cordX][cordY] = cell.number;
         }
      }
      console.log('hhh', byu);
      console.log('hhhhhhhhhh', empty);
      return { byu, empty }
   }
}