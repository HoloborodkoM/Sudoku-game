'use strict'

class SudokuView extends Sudoku {

   constructor() {
      super();

      const field = document.createElement('div');
      field.classList.add('field')
      document.getElementById('program').append(field);
      const numberOfParts = 9;
      const numberOfCellsInPart = 9; 
   
      for (let part = 0; part < numberOfParts; part++) {
         const partOfField = document.createElement('div');
         partOfField.classList.add('part');
         field.append(partOfField);
   
         for (let cell = 0; cell < numberOfCellsInPart; cell++) {
            const cellOfPart = document.createElement('input');
            cellOfPart.classList.add('cell');
            this.field[part][cell].element = cellOfPart;
            partOfField.append(cellOfPart);
         }
      }

      /*const gft = this.getEasyLevelSudoku();
      const frt = gft.array1;
      for (const part of this.field) {
         for (const cell of part) {
            const cordX = cell.x;
            const cordY = cell.y;
            const value = frt[cordX][cordY];
            value === 0 
               ? cell.element.value = '' 
               : cell.element.value = value;
         }
      }*/
   }

   visualCells () {
      const getCells = document.querySelectorAll('.cell');
      for (const elem of getCells) {
         elem.addEventListener('mouseover', event => this.#mouseOverCatcher(event, elem));
         elem.addEventListener('mouseout', event => this.#mouseOutCatcher(event, elem));
         elem.addEventListener('focusin', event => this.#focusInCatcher(event, elem, this.field));
         elem.addEventListener('focusout', event => this.#focusOutCatcher(event, elem));
         elem.addEventListener('keydown', event => this.#keydownCatcher(event, elem, this.field));
   
      }
      return getCells;
   }
   
   #mouseOverCatcher(event, elem, field) {
      elem.classList.add('cell-hover')
   }
   
   #mouseOutCatcher(event, elem, field) {
      elem.classList.remove('cell-hover')
   }
   
   #focusInCatcher(event, elem, field) {
      for (const part of field) {
         for (const cell of part) {
            if (cell.element === elem) {
               cell.element.classList.add('cell-focus')
               const part = this.getPart(cell.currentPart)
               const row = this.getRow(cell.x)
               const column = this.getColumn(cell.y)
               this.#cellStaining(row, elem);
               this.#cellStaining(column, elem);
               this.#cellStaining(part, elem);
            }
         }
      }
   }
   
   #focusOutCatcher(event, elem, field) {
      const allCell = document.querySelectorAll('.cell')
      this.#removeCellStaining(allCell);
   }
   
   #keydownCatcher(event, elem, field) {
      const number = '123456789'
      const checkBackspace = 'Backspace'

      if (number.includes(event.key) || event.key === checkBackspace) {
         for (const part of field) {
            for (const cell of part) {
               if (elem === cell.element) {
                  elem.value = event.key;
                  cell.number = elem.value
               }
               if (event.key === checkBackspace) {
                  elem.value = '';
                  cell.number = '';

               }
            }
         }

      }
      event.preventDefault();
   }

   #cellStaining(array, elem) {
      return getRightCellForColoring(array, elem);
   }

   #removeCellStaining(array) {
      return getRightCellForRemoveColoring(array);
   }
}