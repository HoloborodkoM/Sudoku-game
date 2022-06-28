'use strict'

class Sudoku extends SudokuLogic {

   constructor() {
      super();
      
      this.#createSudokuField(this.field);
      this.#createFunctionalButtons();
      this.#createIndicators();

      this.sudokuElements = {
         getCells: document.querySelectorAll('.cell'),
         getButtonEasy: document.querySelector('.button-easy'),
         getButtonMedium: document.querySelector('.button-medium'),
         getButtonHard: document.querySelector('.button-hard'),
         getBody: document.querySelector('body'),
         getButtonHelp: document.querySelector('.button-help'),
         getNumberOfErrors: document.querySelector('.errors'),
         getNumberOfHelps: document.querySelector('.helps'),
         getSeconds: document.querySelector('.second'),
         getMinutes: document.querySelector('.minute'),
         getHour: document.querySelector('.hour'),
      };

      this.sudokuInfo = {
         cells: 81,
         numbers: '123456789',
         backspace: 'Backspace',
         complete: false,
         empty: true,
         conditionComplete: false,
         conditionalErrors: false,  
         checkForTimer: '', 
         hour: 0,
         minute: 0,
         second: 0,
         interval: 1000,
         checkButtonHelp: true,   
      }; 
   }

   handlingSudokuField() {
      const cells = this.sudokuElements.getCells;
      for (const elem of cells) {
         elem.addEventListener('mouseover', () => this.#mouseoverCatcherForCells(elem));
         elem.addEventListener('mouseout', () => this.#mouseoutCatcherForCells(elem));
         elem.addEventListener('focusin', () => this.#focusinCatcherForCells(elem));
         elem.addEventListener('focusout', () => this.#focusoutCatcherForCells(elem));
         elem.addEventListener('keydown', (event) => this.#keydownCatcherForCells(event, elem));
         elem.addEventListener('keyup', () => this.#keyupCatcherForCells());
      }
   }

   handlingCompleteSudoku() {
      const body = this.sudokuElements.getBody;
      body.addEventListener('mouseover', () => this.#mouseoverCatcherForBody());
   }

   handlingEasyButton() {
      const buttonEasy = this.sudokuElements.getButtonEasy;
      buttonEasy.addEventListener('click', () => this.#clickCatcherForButtonEasy());
   }

   handlingMediumButton() {
      const buttonMedium = this.sudokuElements.getButtonMedium;
      buttonMedium.addEventListener('click', () => this.#clickCatcherForButtonMedium());
   }

   handlingHardButton() {
      const buttonHard = this.sudokuElements.getButtonHard;
      buttonHard.addEventListener('click', () => this.#clickCatcherForButtonHard());
   }

   handlingHelpButton() {
      const buttonHelp = this.sudokuElements.getButtonHelp;
      buttonHelp.addEventListener('click', () => this.#clickCatcherForButtonHelp());
   }

   #mouseoverCatcherForBody() {
      const doneSudoku = this.sudokuInfo.complete;
      if (doneSudoku) {
         const text = 'Congrats!!! You are winner. But you can better. Try again';
         const showTextAfterTwoSeconds = 2000;
         const endGameAfterOneSecond = 3000;
         this.sudokuInfo.complete = false;
         clearInterval(this.sudokuInfo.checkForTimer);
         setTimeout(() => alert(text), showTextAfterTwoSeconds);
         setTimeout(() => location.reload(), endGameAfterOneSecond);
      }
   }
   
   #clickCatcherForButtonEasy() {
      const getEasySudoku = this.getEasyLevelSudoku();
      this.#setParametersForNewGame();
      this.#generateSudokuByClickButton(getEasySudoku, this.field);
      this.#setCellsSudoku(this.field);
      this.#timer(this.sudokuElements, this.sudokuInfo);
   }

   #clickCatcherForButtonMedium() {
      const getEasySudoku = this.getMediumLevelSudoku();
      this.#setParametersForNewGame();
      this.#generateSudokuByClickButton(getEasySudoku, this.field);
      this.#setCellsSudoku(this.field);
      this.#timer(this.sudokuElements, this.sudokuInfo);
   }

   #clickCatcherForButtonHard() {
      const getEasySudoku = this.getHardLevelSudoku();
      this.#setParametersForNewGame();
      this.#generateSudokuByClickButton(getEasySudoku, this.field);
      this.#setCellsSudoku(this.field);
      this.#timer(this.sudokuElements, this.sudokuInfo);
   }

   #clickCatcherForButtonHelp() {
      const helps = this.sudokuElements.getNumberOfHelps;
      const field = this.field;
      while (this.sudokuInfo.checkButtonHelp) {
         const x = Math.floor(Math.random() * 9);
         const y = Math.floor(Math.random() * 9);
         if (field[x][y].number === 0) {
            field[x][y].number = field[x][y].numberAnswer;
            field[x][y].element.value = field[x][y].number;
            this.sudokuInfo.checkButtonHelp = false;
            this.sudokuInfo.helps++;
            helps.textContent = this.sudokuInfo.helps;
         }
      }

      this.#checkCompleteSudoku(this.field);

      if (!this.sudokuInfo.complete) {
         this.sudokuInfo.checkButtonHelp = true;
      } else this.sudokuInfo.checkButtonHelp = false;

      console.log(this.sudokuInfo.checkButtonHelp);
   }

   #mouseoverCatcherForCells(elem) {
      elem.classList.add('cell-hover');
   }
   
   #mouseoutCatcherForCells(elem) {
      elem.classList.remove('cell-hover');
   }
   
   #focusinCatcherForCells(elem) {
      for (const part of this.field) {
         for (const cell of part) {
            if (cell.element === elem) {
               cell.element.classList.add('cell-focus')
               const necessaryСellsForColoring = this.#getCurrentRowColumnAndPart(cell);
               this.#cellStaining(necessaryСellsForColoring.row, elem);
               this.#cellStaining(necessaryСellsForColoring.column, elem);
               this.#cellStaining(necessaryСellsForColoring.part, elem);
            }
         }
      }
   }
   
   #focusoutCatcherForCells(elem) {
      this.#deleteErrors(this.field, elem);
      const allCell = this.sudokuElements.getCells;
      this.#removeCellStaining(allCell);
   }
   
   #keydownCatcherForCells(event, elem) {

      this.#checkStyleError(this.field);
      const currentKey = event.key;
      const checkNumbers = this.sudokuInfo.numbers.includes(currentKey);
      const checkBackspace = this.sudokuInfo.backspace;

      if (checkNumbers || currentKey === checkBackspace) {
         if (!this.sudokuInfo.empty) {
            for (const part of this.field) {
               for (const cell of part) {
                  const checkStartedCell = cell.started;
                  const necessaryСellsForCheckErrors = this.#getCurrentRowColumnAndPart(cell);
                  if (!checkStartedCell) {
                     if (elem === cell.element) {
                        this.#addValueToCell(cell, currentKey);
                        this.#ifClickBackspaceDeleteValue(cell, currentKey, checkBackspace);
                        this.#checkSameValueIfTrueAddError(necessaryСellsForCheckErrors.row, cell);
                        this.#checkSameValueIfTrueAddError(necessaryСellsForCheckErrors.column, cell);
                        this.#checkSameValueIfTrueAddError(necessaryСellsForCheckErrors.part, cell);
                        this.#addClassError(this.field);
                        this.#checkCompleteSudoku(this.field);
                     }
                  }
               }
            }
         }
      }
      event.preventDefault();
   }

   #keyupCatcherForCells() {
      const errors = this.sudokuElements.getNumberOfErrors;
      for (const part of this.field) {
         for (const cell of part) {
            if (cell.error) {
               this.sudokuInfo.errors++;
               errors.textContent = this.sudokuInfo.errors;
               this.sudokuInfo.conditionalErrors = true;
               break;
            }
         }
         if (this.sudokuInfo.conditionalErrors) break;
      }     
      this.sudokuInfo.conditionalErrors = false;
   }

   #setParametersForNewGame() {
      const ButtonHelp = this.sudokuElements.getButtonHelp;
      ButtonHelp.removeAttribute('disabled');
      const errors = this.sudokuElements.getNumberOfErrors;
      const helps = this.sudokuElements.getNumberOfHelps;
      this.sudokuInfo.empty = false;
      this.sudokuInfo.errors = 0;
      this.sudokuInfo.helps = 0;
      errors.textContent = this.sudokuInfo.errors;
      helps.textContent = this.sudokuInfo.helps;
   }

   #generateSudokuByClickButton(getTwoSudoku, field) {
      return generateByClick(getTwoSudoku, field);
   }

   #setCellsSudoku(sudoku) {
      return setCells(sudoku);
   }

   #timer(elements, info) {
      return setTimer(elements, info);
   }

   #createSudokuField(sudokuField) {
      return sudokuFillingForVisual(sudokuField);
   }

   #deleteErrors(sudoku, element) {
      return deleteErrorsAfterUnfocusing(sudoku, element);
   }

   #addValueToCell(cell, key) {
      return addValue(cell, key);
   }

   #ifClickBackspaceDeleteValue(cell, key, backspace) {
      return checkingBackspace(cell, key, backspace);
   }

   #checkSameValueIfTrueAddError(array, cell) {
      return checkSameValue(array, cell);
   }

   #addClassError(sudoku) {
      return addClassError(sudoku);
   }

   #checkCompleteSudoku(sudoku) {
      let counter = 0;
      for (const part of sudoku) {
         for (const cell of part) {
            if (cell.number !== cell.numberAnswer) {
               this.sudokuInfo.complete = false;
               this.sudokuInfo.conditionComplete = true;
               break;
            } else {
               counter++;
            }
         }
         if (this.sudokuInfo.conditionComplete) break;
         if (counter === this.sudokuInfo.cells) {
            this.sudokuInfo.complete = true;
         }
      }
      this.sudokuInfo.conditionComplete = false;
   }

   #getCurrentRowColumnAndPart(cell) {
      const currentRow = cell.x;
      const currentColumn = cell.y;
      const currentPart = cell.currentPart;
      const part = this.getPart(currentPart);
      const row = this.getRow(currentRow);
      const column = this.getColumn(currentColumn);
      return { part, row, column }
   }

   #checkStyleError(sudoku) {
      return checkStyleErrorWhenInputNumberAgain(sudoku);
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