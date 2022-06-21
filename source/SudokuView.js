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
   }

   visualCells () {
      const getCells = document.querySelectorAll('.cell');
      for (const elem of getCells) {
         elem.addEventListener('mouseover', event => this.mouseOverCatcher(event, elem, this.field));
         elem.addEventListener('mouseout', event => this.mouseOutCatcher(event, elem, this.field));
         elem.addEventListener('focusin', event => this.focusInCatcher(event, elem, this.field));
         elem.addEventListener('focusout', event => this.focusOutCatcher(event, elem, this.field));
         elem.addEventListener('keydown', event => this.keydownCatcher(event, elem, this.field));
   
      }
      return getCells;
   }
   
   mouseOverCatcher(event, elem, field) {
      elem.classList.add('cell-hover')
      console.log("over", event, elem);
   }
   
   mouseOutCatcher(event, elem, field) {
      elem.classList.remove('cell-hover')
      console.log("out", event, elem);
   }
   
   focusInCatcher(event, elem, field) {
      for (const part of field) {
         for (const cell of part) {
            if (cell.element === elem) {
               cell.element.classList.add('cell-focus')
               const part = this.getPart(cell.currentPart)
               console.log(part)
               const row = this.getRowWihoutCurrentCell(cell.x, cell.y)
               const column = this.getColumnWitoutCurrentCell(cell.y, cell.x)
               for (const partCell of part) {
                  if (partCell.element !== elem) {
                     partCell.element.classList.add('cell-helper')
                  }
               }
               for (const rowCell of row) {
                  rowCell.element.classList.add('cell-helper')
               }
               for (const columnCell of column) {
                  columnCell.element.classList.add('cell-helper')
               }
            }
         }
      }
   }
   
   focusOutCatcher(event, elem, field) {
      const allCell = document.querySelectorAll('.cell')
      for (const removeCell of allCell) {
         removeCell.classList.remove('cell-focus', 'cell-helper')
      }
      console.log("out", event, elem);
   }
   
   keydownCatcher(event, elem, field) {
      console.log("k", event, elem);
   }
}