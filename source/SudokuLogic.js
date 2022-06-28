'use strict'

class SudokuLogic {
   
   constructor() {

      this.field = [];

      const sudokuParametrs = {
         numberOfParts: 9,
         numbOfRowsInPart: 3,
         numbOfColumnInPart: 3,
         maxSize: 9,
         checkRow: 0,
         flagStart: true,
         currentPart: 0,
      }

      for (let part = 0; part < sudokuParametrs.numberOfParts; part++) {
         this.field.push([]);
      }
      
      for (const part of this.field) {
         if (sudokuParametrs.checkRow % 3 === 0 && !sudokuParametrs.flagStart) {
            sudokuParametrs.numbOfRowsInPart += 3;
         }
         sudokuParametrs.flagStart = false;
         for (let x = sudokuParametrs.numbOfRowsInPart - 3; x < sudokuParametrs.numbOfRowsInPart; x++) {
            if (sudokuParametrs.numbOfColumnInPart > sudokuParametrs.maxSize) sudokuParametrs.numbOfColumnInPart = 3;
            for (let y = sudokuParametrs.numbOfColumnInPart - 3; y < sudokuParametrs.numbOfColumnInPart; y++) {
               part.push({
                  x,
                  y, 
                  currentPart: sudokuParametrs.currentPart,
                  number: 0,
                  numberAnswer: 0,
                  started: false,
                  error: false
               });
            }
         }
         sudokuParametrs.currentPart++;
         sudokuParametrs.numbOfColumnInPart += 3;
         sudokuParametrs.checkRow++;
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
      return easyLevel();
   }

   getMediumLevelSudoku() {
      return mediumLevel();
   }

   getHardLevelSudoku() {
      return hardLevel();
   }

   getFullSudoku() {
      return getFinalyAnswerSudoku();
   }

   getEmptySudoku() {
      return getSolutionSudoku();
   }
}