'use strict'

class SudokuView extends Sudoku {

   constructor() {
      super();

      const sudokuField = this.field;
      this.#createSudokuField(sudokuField);
      this.#createFunctionalButtons();
      this.#createIndicators();

      /*const indicator = document.getElementById('indicators');
      const timerHour = document.createElement('div');
      timerHour.classList.add('hour');
      timerHour.textContent = '0';
      indicator.append(timerHour);
      const firstTwoDots = document.createElement('div');
      firstTwoDots.textContent = ':';
      indicator.append(firstTwoDots);
      const timerMinute = document.createElement('div');
      timerMinute.classList.add('minute');
      timerMinute.textContent = '00';
      indicator.append(timerMinute);
      const secondTwoDots = document.createElement('div');
      secondTwoDots.textContent = ':';
      indicator.append(secondTwoDots);
      const timerSecond = document.createElement('div');
      timerSecond.classList.add('second');
      timerSecond.textContent = '00';
      indicator.append(timerSecond);
      const numbersOfErrorsOrHelps = document.createElement('div');
      numbersOfErrorsOrHelps.classList.add('number-errors-help');
      indicator.append(numbersOfErrorsOrHelps);
      const textError = document.createElement('div');
      textError.textContent = 'Errors: ';
      numbersOfErrorsOrHelps.append(textError);
      const errors = document.createElement('div');
      errors.classList.add('errors');
      errors.textContent = '0';
      numbersOfErrorsOrHelps.append(errors);
      const textHelp = document.createElement('div');
      textHelp.textContent = 'Helps: ';
      numbersOfErrorsOrHelps.append(textHelp);
      const helps = document.createElement('div');
      helps.classList.add('helps');
      helps.textContent = '0';
      numbersOfErrorsOrHelps.append(helps);*/

      this.object.errors = 0;
      this.object.helps = 0;
      this.object.empty = true;
   }

   visualCells () {
      this.object.flag = false;
      const getCells = document.querySelectorAll('.cell');
      for (const elem of getCells) {
         elem.addEventListener('mouseover', event => this.#mouseOverCatcher(event, elem));
         elem.addEventListener('mouseout', event => this.#mouseOutCatcher(event, elem));
         elem.addEventListener('focusin', event => this.#focusInCatcher(event, elem, this.field));
         elem.addEventListener('focusout', event => this.#focusOutCatcher(event, elem, this.field));
         elem.addEventListener('keydown', event => this.#keydownCatcher(event, elem, this.field));
         elem.addEventListener('keyup', event => this.#keyupCatcher(event, elem, this.field));
      }
   }

   getResult() {
      const getFront = document.querySelector('body');
      getFront.addEventListener('mouseover', event => this.#mouseOverCatcherResult(event, getFront));
   }

   buttonsOneFunctional() {
      const getFront = document.querySelector('.button-easy')
      getFront.addEventListener('click', event => this.#clickCatcher1(event, getFront, this.field))
   
   }

   buttonsTwoFunctional() {
      const getFront = document.querySelector('.button-medium')
      getFront.addEventListener('click', event => this.#clickCatcher2(event, getFront, this.field))
   }

   buttonsThreeFunctional() {
      const getFront = document.querySelector('.button-hard')
      getFront.addEventListener('click', event => this.#clickCatcher3(event, getFront, this.field))
   }

   buttonsFourFunctional() {
      this.object.checkButtonHelp = true;
      this.object.flag = false;
      const getFront = document.querySelector('.button-help')
      getFront.addEventListener('click', event => this.#clickCatcher4(event, getFront, this.field))
   }

   #mouseOverCatcherResult(event, elem, field) {
      if (this.object.complete) {
         this.object.complete = false;
         clearInterval(this.object.check)
         setTimeout(() => alert('Congrats!!!'), 2000);
         setTimeout(() => location.reload(), 3000);
      }
   }
   
   #clickCatcher1(event, element, field) {
      const getButtonHelp = document.querySelector('.button-help')
      getButtonHelp.removeAttribute('disabled');
      this.object.empty = false;
      this.object.errors = 0;
      this.object.helps = 0;
      document.querySelector('.errors').textContent = this.object.errors;
      document.querySelector('.helps').textContent = this.object.helps;
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
      const hourElement = document.querySelector('.hour')
      const minuteElement = document.querySelector('.minute');
      const secondElement = document.querySelector('.second');
      

      let hour = 0;
      let minute = 0;
      let second = 0;
      let interval = 1000;
      const end = true;

      secondElement.textContent = '0' + second;
      minuteElement.textContent = '0' + minute;
      hourElement.textContent = hour;

      clearInterval(this.object.check);
      this.object.check = setInterval(startTimer,interval);  

      console.log(minute, second);
      function startTimer() {
         second++;
         if (second <= 9) {
            secondElement.textContent = '0' + second;
         }
         if (second > 9) {
            secondElement.textContent = second;
         }
         if (second > 59) {
            minute++;
            second = 0;
            secondElement.textContent = '0' + second;
         }
         if (minute <= 9) {
            minuteElement.textContent = '0' + minute;
         }
         if (minute > 9) {
            minuteElement.textContent = minute;
         }
         if (minute > 59) {
            hour++;
            hourElement.textContent = hour;
            minute = 0;
            minuteElement.textContent = '0' + minute;
            second = 0;
            secondElement.textContent = '0' + second;
            setTimeout(Hi, 2000);
            clearInterval(end);
         }
      
      }
      
      function Hi() {
         alert('End game! more 1 hour');
         location.reload();
      }
   }

   #clickCatcher2(event, element, field) {
      const getButtonHelp = document.querySelector('.button-help')
      getButtonHelp.removeAttribute('disabled');
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
      const getButtonHelp = document.querySelector('.button-help')
      getButtonHelp.removeAttribute('disabled');
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

   #clickCatcher4(event, element, field) {
      while (this.object.checkButtonHelp) {
         const x = Math.floor(Math.random() * 9);
         const y = Math.floor(Math.random() * 9);
         if (field[x][y].number === 0) {
            field[x][y].number = field[x][y].numberAnswer;
            field[x][y].element.value = field[x][y].number
            this.object.checkButtonHelp = false;
            this.object.helps++;
            document.querySelector('.helps').textContent = this.object.helps;
         }
         this.object.gyu = 81;
         for (const par of field) {
            for (const cell of par) {
               if (cell.number !== cell.numberAnswer) {
                  this.object.complete = false;
                  this.object.flag = true;
                  break;
               } else {
                  this.object.gyu--;
               }
            }
            if (this.object.flag) {
               break;
            }
            if (this.object.gyu === 0) {
               this.object.complete = true;
               this.object.checkButtonHelp = false;
            }
         }   
         this.object.flag = false;
      }

      if (this.object.gyu !== 0) {
         this.object.checkButtonHelp = true;
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
      console.log(this.object.empty);

      if (number.includes(event.key) || event.key === checkBackspace) {
         if (!this.object.empty) {
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
   
                        for (const check of part1) {
                           if (cell.number === check.number && cell.number !== 0) {
                              cell.error = true;
                              check.error = true;
                              if (cell.number === cell.numberAnswer) {
                                 cell.error = false;
                              }
                           }
                        }
   
                        for (const check2 of row) {
                           console.log('row', check2.error);
                           if (cell.number === check2.number && cell.number !== 0) {
                              cell.error = true;
                              check2.error = true;
                              if (cell.number === cell.numberAnswer) {
                                 cell.error = false;
                              }
                           }
                        }
   
                        for (const checkC of column) {
                           console.log('column', checkC.error);
                           if (cell.number === checkC.number && cell.number !== 0) {
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
   
                        let gyu = 0;
                        for (const par of field) {
                           for (const cell of par) {
                              if (cell.number !== cell.numberAnswer) {
                                 this.object.complete = false;
                                 this.object.flag = true;
                                 break;
                              } else {
                                 gyu++;
                              }
                           }
                           if (this.object.flag) {
                              break;
                           }
                           if (gyu === 81) {
                              this.object.complete = true;
                           }
                        }
   
                        this.object.flag = false;
                     }
                  }
               }
            }
         }
      }
      event.preventDefault();
   }

   #keyupCatcher(event, elem, field) {
      let combo = false
      for (const par of field) {
         for (const cell of par) {
            if (cell.error) {
               this.object.errors++;
               document.querySelector('.errors').textContent = this.object.errors;
               combo = true;
               break;
            }
         }
         if (combo) break;
      }     
   }

   #createSudokuField(sudokuField) {
      return sudokuFillingForVisual(sudokuField);
   }

   #createFunctionalButtons() {
      return buttonsForActions();
   }

   #createIndicators() {
      return indicatorsForViewResults();
   }

   #cellStaining(array, elem) {
      return getRightCellForColoring(array, elem);
   }

   #removeCellStaining(array) {
      return getRightCellForRemoveColoring(array);
   }
}