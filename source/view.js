'use strict'

const createSudokuField = () => {
   const field = document.createElement('div');
   field.classList.add('field')
   document.getElementById('program').append(field);
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

/*const visualCells = () => {
   const getCells = document.querySelectorAll('.cell');
   for (const elem of getCells) {
      elem.addEventListener('focus', event => hoverCatcher(event, elem));
   }
   return getCells;
}

function hoverCatcher(event, elem) {
   console.log("hoverCa", event, elem)
}


createSudokuField();
visualCells();
const getCells = document.querySelectorAll('.cell');

*/
createSudokuField();