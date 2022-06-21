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
                  currentPart
               });
            }
         }
         currentPart++;
         numbOfColumnInPart += 3;
         checkRow++;
      }
      console.log(this.field)
   }

   getRowWihoutCurrentCell(numberRow, numberY) {
      const row = [];

      for (const part of this.field) {
         for (const cell of part) {
            if (cell.x === numberRow && cell.y !== numberY) row.push(cell);
         }
      }

      return row;
   }

   getColumnWitoutCurrentCell(numberColumn, numberX) {
      const column = [];

      for (const part of this.field) {
         for (const cell of part) {
            if (cell.y === numberColumn && cell.x !== numberX) column.push(cell);
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

}