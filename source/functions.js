'use strict'

const getRightCellForColoring = (cellArray, currentCell) => {
   for (const cellWithoutColor of cellArray) {
      if (cellWithoutColor.element !== currentCell) {
         cellWithoutColor.element.classList.add('cell-helper');
      }
   }
}

const getRightCellForRemoveColoring = (cellArray) => {
   for (const cellWithColor of cellArray) {
      cellWithColor.classList.remove('cell-helper', 'cell-focus');
   }
}