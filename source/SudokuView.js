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

      const difficultyButtons = document.createElement('div');
      difficultyButtons.classList.add('buttons')
      document.getElementById('program').append(difficultyButtons);
      const buttonEasy = document.createElement('button');
      buttonEasy.classList.add('button-easy');
      buttonEasy.textContent = 'Easy';
      difficultyButtons.append(buttonEasy);
      const buttonMedium = document.createElement('button');
      buttonMedium.classList.add('button-medium');
      buttonMedium.textContent = 'Medium';
      difficultyButtons.append(buttonMedium);
      const buttonHard = document.createElement('button');
      buttonHard.classList.add('button-hard');
      buttonHard.textContent = 'Hard';
      difficultyButtons.append(buttonHard);
   }

   visualCells () {
      const getCells = document.querySelectorAll('.cell');
      for (const elem of getCells) {
         elem.addEventListener('mouseover', event => this.#mouseOverCatcher(event, elem));
         elem.addEventListener('mouseout', event => this.#mouseOutCatcher(event, elem));
         elem.addEventListener('focusin', event => this.#focusInCatcher(event, elem, this.field));
         elem.addEventListener('focusout', event => this.#focusOutCatcher(event, elem, this.field));
         elem.addEventListener('keydown', event => this.#keydownCatcher(event, elem, this.field));
   
      }
      return getCells;
   }

   buttonsOneFunctional() {
      const getFront = document.querySelector('.button-easy')
      getFront.addEventListener('click', event => this.#clickCatcher1(event, getFront, this.field))
      return getFront;
   }

   buttonsTwoFunctional() {
      const getFront = document.querySelector('.button-medium')
      getFront.addEventListener('click', event => this.#clickCatcher2(event, getFront, this.field))
      return getFront;
   }

   buttonsThreeFunctional() {
      const getFront = document.querySelector('.button-hard')
      getFront.addEventListener('click', event => this.#clickCatcher3(event, getFront, this.field))
      return getFront;
   }
   
   #clickCatcher1(event, element, field) {
      const getEasySudoku = this.getEasyLevelSudoku();
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

      for (const part of field) {
         for (const cell of part) {
            cell.error = false;
            if (cell.number === 0) {
               cell.element.value = '';
               cell.started = false;
            } else {
               cell.element.value = cell.number;
               cell.started = true;
            }
         }
      }
   }

   #clickCatcher2(event, element, field) {
      const getEasySudoku = this.getMediumLevelSudoku();
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

      for (const part of this.field) {
         for (const cell of part) {
            cell.number === 0 
               ? cell.element.value = '' 
               : cell.element.value = cell.number;
         }
      }
   }

   #clickCatcher3(event, element, field) {
      const getEasySudoku = this.getHardLevelSudoku();
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

      for (const part of this.field) {
         for (const cell of part) {
            cell.number === 0 
               ? cell.element.value = '' 
               : cell.element.value = cell.number;
         }
      }
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
      for (const part of field) {
         for (const cell of part) {
            if (elem === cell.element && cell.error) {
               cell.error = false;
               cell.element.value = '';
               cell.number = 0;
            } else {
               cell.error = false;
            }
         }
      }
      const allCell = document.querySelectorAll('.cell')
      this.#removeCellStaining(allCell);
   }
   
   #keydownCatcher(event, elem, field) {
      const number = '123456789'
      const checkBackspace = 'Backspace'

      for (const part of field) {
         for (const cell of part) {
            if (cell.error) {
               cell.element.classList.remove('cell-error');
               cell.error = false;
            }
         }
      }

      if (number.includes(event.key) || event.key === checkBackspace) {
         for (const part of field) {
            for (const cell of part) {
               const part1 = this.getPart(cell.currentPart)
               const row = this.getRow(cell.x)
               const column = this.getColumn(cell.y)
               if (!cell.started) {
                  if (elem === cell.element) {
                     cell.element.value = event.key;
                     cell.number = parseInt(cell.element.value);
                     if (event.key === checkBackspace) {
                        cell.element.value = '';
                        cell.number = 0;
                     }

                     console.log(part);
                     console.log(row);
                     console.log(column);
                     console.log(field);
                     for (const check of part1) {
                        console.log('part', check.error);
                        if (cell.number === check.number) {
                           cell.error = true;
                           check.error = true;
                           if (cell.number === cell.numberAnswer) {
                              cell.error = false;
                           }
                        }
                     }

                     for (const check2 of row) {
                        console.log('row', check2.error);
                        if (cell.number === check2.number) {
                           cell.error = true;
                           check2.error = true;
                           if (cell.number === cell.numberAnswer) {
                              cell.error = false;
                           }
                        }
                     }

                     for (const checkC of column) {
                        console.log('column', checkC.error);
                        if (cell.number === checkC.number) {
                           cell.error = true;
                           checkC.error = true;
                           if (cell.number === cell.numberAnswer) {
                              cell.error = false;
                           }
                        }
                     }

                     for (const par of field) {
                        for (const cell of par) {
                           if (cell.error) {
                              cell.element.classList.add('cell-error');
                           }
                        }
                     }
                     console.log(field);
                  }
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