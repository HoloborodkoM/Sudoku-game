'use strict'

class Sudoku {
   
   constructor() {

      this.field = [];
      const numberOfParts = 9;

      for (let part = 1; part <= numberOfParts; part++) {
         this.field.push([]);
      }
      
      let numbOfRowsInPart = 3;
      let numbOfColumnInPart = 3;
      const maxSize = 9;
      let checkRow = 0;
      let flagStart = true;
      let currentPart = 0;
      for (const part of this.field) {
         if (checkRow % 3 === 0 && !flagStart) {
            numbOfRowsInPart += 3;
         }
         flagStart = false;
         for (let x = numbOfRowsInPart - 3; x < numbOfRowsInPart; x++) {
            if (numbOfColumnInPart > maxSize) numbOfColumnInPart = 3;
            for (let y = numbOfColumnInPart - 3; y < numbOfColumnInPart; y++) {
               part.push({
                  x,
                  y, 
                  currentPart,
                  number: 0,
               });
            }
         }
         currentPart++;
         numbOfColumnInPart += 3;
         checkRow++;
      }
   }

   getRow(numberRow) {
      const row = [];

      for (const part of this.field) {
         for (const cell of part) {
            if (cell.x === numberRow) row.push(cell);
         }
      }
      return row;
   }

   getColumn(numberColumn) {
      const column = [];

      for (const part of this.field) {
         for (const cell of part) {
            if (cell.y === numberColumn) column.push(cell);
         }
      }
      return column;
   }

   getPart(numberPart) {
      const part = [];

      for (const currPart of this.field) {
         for (const cell of currPart) {
            if (cell.currentPart === numberPart) part.push(cell);
         }
      }
      return part;
   }

   getEasyLevelSudoku() {
   }

   getMediumLevelSudoku() {

   }

   getHardLevelSudoku() {

   }
}