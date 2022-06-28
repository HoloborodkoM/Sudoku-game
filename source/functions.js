'use strict'

const sudokuComponentsForGeneration = {
   sudokuAreas: 3,
   sudokuLines: 9,
   numberOfLinePermutations: 20,
   numberOfAreasPermutations: 5,
}

const sudokuComponentsForVisuality = {
   numberOfParts: 9,
   numberOfCellsInPart: 9,
}

const filingPartsAndCellsForVisual = (field, sudokuField) => {
   const parts = sudokuComponentsForVisuality.numberOfParts;
   const cells = sudokuComponentsForVisuality.numberOfCellsInPart;

   for (let part = 0; part < parts; part++) {
      const partOfField = document.createElement('div');
      fillSelectorWithClass(field, partOfField, 'part');

      for (let cell = 0; cell < cells; cell++) {
         const cellOfPart = document.createElement('input');
         fillSelectorWithClass(partOfField, cellOfPart, 'cell');
         sudokuField[part][cell].element = cellOfPart;
      }
   }
}

const sudokuFillingForVisual = (sudokuField) => {
   const field = document.createElement('div');
   field.classList.add('field');
   document.getElementById('program').append(field);
   filingPartsAndCellsForVisual(field, sudokuField);
}

const fillSelectorWithTextAndClass = (root, currentSelector, classSelector, textSelector) => {
   currentSelector.classList.add(classSelector);
   currentSelector.textContent = textSelector;
   root.append(currentSelector);
}

const fillSelectorWithClass = (root, currentSelector, classSelector) => {
   currentSelector.classList.add(classSelector);
   root.append(currentSelector);
}

const fillSelectorWithText = (root, currentSelector, textSelector) => {
   currentSelector.textContent = textSelector;
   root.append(currentSelector);
}

const buttonsForActions = () => {
   const variabilityButtons = document.createElement('div');
   variabilityButtons.classList.add('buttons');
   document.getElementById('program').append(variabilityButtons);
   const buttonEasy = document.createElement('button');
   fillSelectorWithTextAndClass(variabilityButtons, buttonEasy, 'button-easy', 'Easy');
   const buttonMedium = document.createElement('button');
   fillSelectorWithTextAndClass(variabilityButtons, buttonMedium, 'button-medium', 'Medium');
   const buttonHard = document.createElement('button');
   fillSelectorWithTextAndClass(variabilityButtons, buttonHard, 'button-hard', 'Hard');
   const buttonHelp = document.createElement('button');
   fillSelectorWithTextAndClass(variabilityButtons, buttonHelp, 'button-help', 'Help');
   buttonHelp.setAttribute('disabled', true);
   const tutorial = document.createElement('form')
   tutorial.setAttribute('action', 'tutorial.html');
   variabilityButtons.append(tutorial);
   const buttonTutorial = document.createElement('button');
   fillSelectorWithTextAndClass(tutorial, buttonTutorial, 'button-tutorial', 'Tutorial');
}

const indicatorsForViewResults = () => {
   const indicator = document.getElementById('indicators');
   const timerHour = document.createElement('div');
   fillSelectorWithTextAndClass(indicator, timerHour, 'hour', '0');
   const firstTwoDots = document.createElement('div');
   fillSelectorWithText(indicator, firstTwoDots, ':');
   const timerMinute = document.createElement('div');
   fillSelectorWithTextAndClass(indicator, timerMinute, 'minute', '00');
   const secondTwoDots = document.createElement('div');
   fillSelectorWithText(indicator, secondTwoDots, ':');
   const timerSecond = document.createElement('div');
   fillSelectorWithTextAndClass(indicator, timerSecond, 'second', '00');
   const numbersOfErrorsOrHelps = document.createElement('div');
   fillSelectorWithClass(indicator, numbersOfErrorsOrHelps, 'number-errors-helps');
   const textError = document.createElement('div');
   fillSelectorWithText(numbersOfErrorsOrHelps, textError, 'Errors: ');
   const errors = document.createElement('div');
   fillSelectorWithTextAndClass(numbersOfErrorsOrHelps, errors, 'errors', '0');
   const textHelp = document.createElement('div');
   fillSelectorWithText(numbersOfErrorsOrHelps, textHelp, 'Helps: ');
   const helps = document.createElement('div');
   fillSelectorWithTextAndClass(numbersOfErrorsOrHelps, helps, 'helps', '0');
}

const deleteErrorsAfterUnfocusing = (sudoku, element) => {
   for (const part of sudoku) {
      for (const cell of part) {
         if (element === cell.element && cell.error) {
            cell.error = false;
            cell.element.value = '';
            cell.number = 0;
         } else {
            cell.error = false;
         }
      }
   }
}

const checkStyleErrorWhenInputNumberAgain = (sudoku) => {
   for (const part of sudoku) {
      for (const cell of part) {
         if (cell.error) {
            cell.element.classList.remove('cell-error');
            cell.error = false;
         }
      }
   }
}

const getRightCellForColoring = (cellArray, currentCell) => {
   for (const cellWithoutColor of cellArray) {
      if (cellWithoutColor.element !== currentCell) {
         cellWithoutColor.element.classList.add('cell-helper');
      }
   }
}

const getRightCellForRemoveColoring = (cellArray) => {
   for (const cellWithColor of cellArray) {
      cellWithColor.classList.remove('cell-helper', 'cell-focus', 'cell-error');
   }
}

const addValue = (cell, key) => {
   cell.element.value = key;
   cell.number = parseInt(cell.element.value);
}

const checkingBackspace = (cell, key, backspace) => {
   if (key === backspace) {
      cell.element.value = '';
      cell.number = 0;
   }
}

const checkSameValue = (cellArray, currentCell) => {
   for (const check of cellArray) {
      if (currentCell.number === check.number && currentCell.number !== 0) {
         currentCell.error = true;
         check.error = true;
         if (currentCell.number === currentCell.numberAnswer) {
            currentCell.error = false;
         }
      }
   }
}

const addClassError = (sudoku) => {
   for (const par of sudoku) {
      for (const cell of par) {
         if (cell.error) {
            cell.element.classList.add('cell-error');
         }
      }
   }
}

const generateByClick = (sudokus, field) => {
   const neededSudoku = sudokus.partialSudoku;
   const fullSudoku = sudokus.completedSudoku;
   for (const part of field) {
      for (const cell of part) {
         const cordX = cell.x;
         const cordY = cell.y;
         cell.number = neededSudoku[cordX][cordY];
         cell.numberAnswer = fullSudoku[cordX][cordY];
      }         
   }
}

const setCells = (sudoku) => {
   for (const part of sudoku) {
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

const setTimer = (elements, info) => {
   
   const hourElement = elements.getHour;
   const minuteElement = elements.getMinutes;
   const secondElement = elements.getSeconds;
   
   info.hour = 0;
   info.minute = 0;
   info.second = 0;
   const end = true;

   secondElement.textContent = '0' + info.second;
   minuteElement.textContent = '0' + info.minute;
   hourElement.textContent = info.hour;

   clearInterval(info.checkForTimer);
   info.checkForTimer = setInterval(startTimer, info.interval);  

   function startTimer() {
      info.second++;
      if (info.second <= 9) {
         secondElement.textContent = '0' + info.second;
      }
      if (info.second > 9) {
         secondElement.textContent = info.second;
      }
      if (info.second > 59) {
         info.minute++;
         info.second = 0;
         secondElement.textContent = '0' + info.second;
      }
      if (info.minute <= 9) {
         minuteElement.textContent = '0' + info.minute;
      }
      if (info.minute > 9) {
         minuteElement.textContent = info.minute;
      }
      if (info.minute > 59) {
         info.hour++;
         hourElement.textContent = info.hour;
         info.minute = 0;
         minuteElement.textContent = '0' + info.minute;
         info.second = 0;
         secondElement.textContent = '0' + info.second;
         setTimeout(outTime, 2000);
         clearInterval(end);
      }
   }
   
   function outTime() {
      const text = 'End game!!! More 1 hour';
      alert(text);
      location.reload();
   }
}

const generateRightSudoku = (x, y) => {
   const area = sudokuComponentsForGeneration.sudokuAreas;
   const firstPart = x * area + x / area + y;
   const secondPart = area * area;
   const basicSudokuFormula = Math.floor((firstPart % secondPart) + 1);
   return basicSudokuFormula;
}

const generationTwoBaseSudoku = () => {
   const sudokuAnswer = [];
   const sudokuSolution = [];
   const size = sudokuComponentsForGeneration.sudokuLines;

   for (let row = 0; row < size; row++) {
      sudokuAnswer[row] = [];
      sudokuSolution[row] = [];
      for (let column = 0; column < size; column++) {
         sudokuAnswer[row][column] = generateRightSudoku(row, column);
         sudokuSolution[row][column] = 0;
      }
   }
   return { sudokuAnswer, sudokuSolution };
}

const getRandomValue = (needValue) => {
   const randomValue = Math.floor(Math.random() * needValue);
   return randomValue;
}

const settingRandomValuesForLines = () => {
   const area = sudokuComponentsForGeneration.sudokuAreas;
   const randomArea = getRandomValue(area);
   const lineOneRandom = getRandomValue(area);
   const lineOne = randomArea * area + lineOneRandom;
   let lineTwoRandom = getRandomValue(area);
   while (lineTwoRandom === lineOneRandom) {
      lineTwoRandom = getRandomValue(area);
   }
   const lineTwo = randomArea * area + lineTwoRandom;
   return { lineOne, lineTwo }
}

const swapHorizontal = (matrixSudoku, swapOne, swapTwo, column) => {
   let temporaryVariable = matrixSudoku[swapOne][column];
   matrixSudoku[swapOne][column] = matrixSudoku[swapTwo][column];
   matrixSudoku[swapTwo][column] = temporaryVariable;
}

const swapVertical = (matrixSudoku, swapOne, swapTwo, row) => {
   let temporaryVariable = matrixSudoku[row][swapOne];
   matrixSudoku[row][swapOne] = matrixSudoku[row][swapTwo];
   matrixSudoku[row][swapTwo] = temporaryVariable;
}

const sortingLines = (arrayLines, matrixSudoku, flag) => {
   const size = sudokuComponentsForGeneration.sudokuLines;
   const firstValue = arrayLines[0];
   const secondValue = arrayLines[1];
   const lineOne = firstValue;
   const lineTwo = secondValue;
   for (let element = 0; element < size; element++) {
      if (flag) {
         swapHorizontal(matrixSudoku, lineOne, lineTwo, element);
      } else {
         swapVertical(matrixSudoku, lineOne, lineTwo, element);
      }
   }
}

const randomColumnSorting = (sudokuAnswer) => {
   const sortRow = false;
   const reshuffle = sudokuComponentsForGeneration.numberOfLinePermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomColumns = settingRandomValuesForLines();
      const columnNumbers = Object.values(randomColumns);
      sortingLines(columnNumbers, sudokuAnswer, sortRow);
   }
}

const randomRowSorting = (sudokuAnswer) => {
   const sortRow = true;
   const reshuffle = sudokuComponentsForGeneration.numberOfLinePermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomRows = settingRandomValuesForLines();
      const rowNumbers = Object.values(randomRows);
      sortingLines(rowNumbers, sudokuAnswer, sortRow);
   }
}

const settingRandomValuesForAreas = () => {
   const area = sudokuComponentsForGeneration.sudokuAreas;
   const areaOne = getRandomValue(area);
   let areaTwo = getRandomValue(area);
   while (areaOne === areaTwo) {
      areaTwo = getRandomValue(area);
   }
   return { areaOne, areaTwo }
}

const sortingAreas = (arrayAreas, matrixSudoku, flag) => {
   const size = sudokuComponentsForGeneration.sudokuLines;
   const area = sudokuComponentsForGeneration.sudokuAreas;
   const firstValue = arrayAreas[0];
   const secondValue = arrayAreas[1];
   const areaOne = firstValue;
   const areaTwo = secondValue;
   if (flag) {
      for (let row = 0; row < area; row++) {
         for (let column = 0; column < size; column++) {
            const swapRowOne = row + areaOne * area;
            const swapRowTwo = row + areaTwo * area;
            swapHorizontal(matrixSudoku, swapRowOne, swapRowTwo, column);
         }
      }
   } else {
      for (let row = 0; row < size; row++) {
         for (let column = 0; column < area; column++) {
            const swapColumnOne = column + areaOne * area;
            const swapColumnTwo = column + areaTwo * area;
            swapVertical(matrixSudoku, swapColumnOne, swapColumnTwo, row);
         }
      }
   }
}

const randomAreaHorizontalSorting = (sudokuAnswer) => {
   const sortHorizontal = true;
   const reshuffle = sudokuComponentsForGeneration.numberOfAreasPermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomHorizontalAreas = settingRandomValuesForAreas();
      const horizontalAreaNumbers = Object.values(randomHorizontalAreas);
      sortingAreas(horizontalAreaNumbers, sudokuAnswer, sortHorizontal)
   }
}

const randomAreaVerticalSorting = (sudokuAnswer) => {
   const sortHorizontal = false;
   const reshuffle = sudokuComponentsForGeneration.numberOfAreasPermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomVerticalAreas = settingRandomValuesForAreas();
      const verticalAreaNumbers = Object.values(randomVerticalAreas);
      sortingAreas(verticalAreaNumbers, sudokuAnswer, sortHorizontal)
   }
}

const getSolutionSudoku = () => {
   const mySudoku = generationTwoBaseSudoku();
   const emptySudoku = mySudoku.sudokuSolution;
   return emptySudoku;
}

const getFinalyAnswerSudoku = () => {
   const mySudoku = generationTwoBaseSudoku();
   const completedSudoku = mySudoku.sudokuAnswer;
   randomColumnSorting(completedSudoku);
   randomRowSorting(completedSudoku)
   randomAreaHorizontalSorting(completedSudoku);
   randomAreaVerticalSorting(completedSudoku);
   return completedSudoku;
}

const sudokuFilling = (partialSudoku, completedSudoku, size, numberOfFilledCellsForNLevel, counter) => {
   while (counter < numberOfFilledCellsForNLevel) {
      const randomRow = getRandomValue(size);
      const randomColumn = getRandomValue(size);
      const currentElement = partialSudoku[randomRow][randomColumn];
      if (currentElement === 0) {
         partialSudoku[randomRow][randomColumn] = completedSudoku[randomRow][randomColumn];
         counter++;
      }
   }
}

const partiallyCompleteSudoku = (difficultyNumber) => {
   const size = sudokuComponentsForGeneration.sudokuLines;
   const completedSudoku = getFinalyAnswerSudoku();
   const getAnEmptySudoku = getSolutionSudoku();
   let counter = 0;
   const numberOfFilledCellsForNLevel = difficultyNumber;
   const partialSudoku = [...getAnEmptySudoku];
   sudokuFilling(partialSudoku, completedSudoku, size, numberOfFilledCellsForNLevel, counter);
   return { partialSudoku, completedSudoku };
}

const easyLevel = () => {
   const numberOfFilledCellsForAnEasyLevel = 60;
   const newSudokuForEasy = partiallyCompleteSudoku(numberOfFilledCellsForAnEasyLevel); 
   return newSudokuForEasy;
}

const mediumLevel = () => {
   const numberOfFilledCellsForAnMediumLevel = 50;
   const newSudokuForMedium = partiallyCompleteSudoku(numberOfFilledCellsForAnMediumLevel);
   return newSudokuForMedium;
}

const hardLevel = () => {
   const numberOfFilledCellsForAnHardLevel = 40;
   const newSudokuForHard = partiallyCompleteSudoku(numberOfFilledCellsForAnHardLevel);
   return newSudokuForHard;
}

