'use strict'

const createSudokuField = () => {
   const field = document.createElement('div');
   field.classList.add('field')
   document.querySelector('#program').append(field);
   const numberOfParts = 9;
   const numberOfCellsInPart = 9; 

   for (let part = 0; part < numberOfParts; part++) {
      const partOfField = document.createElement('div');
      partOfField.classList.add('parts');
      field.append(partOfField);

      for (let cell = 0; cell < numberOfCellsInPart; cell++) {
         const cellOfPart = document.createElement('input');
         cellOfPart.classList.add('cell');
         partOfField.append(cellOfPart);
      }
   }
   
   return field;
}


createSudokuField();