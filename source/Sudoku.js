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
                  y
               });
            }
         }
         numbOfColumnInPart += 3;
         checkRow++;
      }
      console.log(this.field[0][0])
   }

   getRow(numberRow) {
      const row = [];
      const maxSize = 9;
      const currentNumberRow = numberRow - 1;

      for (const part of this.field) {
         for (const cell of part) {
            if (cell.x === currentNumberRow) row.push(cell);
         }
      }

      return row;
   }

   getColumn(numberColumn) {
      const column = [];
      const maxSize = 9;
      const currentNumberColumn = numberColumn - 1;

      for (const part of this.field) {
         for (const cell of part) {
            if (cell.y === currentNumberColumn) column.push(cell);
         }
      }

      return column;
   }

}