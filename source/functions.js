'use strict'

const sudokuComponents = {
   sudokuAreas: 3,
   sudokuLines: 9,
   numberOfLinePermutations: 20,
   numberOfAreasPermutations: 5,
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
      cellWithColor.classList.remove('cell-helper', 'cell-focus');
   }
}

const generateRightSudoku = (x, y) => {
   const area = sudokuComponents.sudokuAreas;
   const firstPart = x * area + x / area + y;
   const secondPart = area * area;
   const basicSudokuFormula = Math.floor((firstPart % secondPart) + 1);
   return basicSudokuFormula;
}

const generationTwoBaseSudoku = () => {
   const sudokuAnswer = [];
   const sudokuSolution = [];
   const size = sudokuComponents.sudokuLines;

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
   const area = sudokuComponents.sudokuAreas;
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
   const size = sudokuComponents.sudokuLines;
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
   const reshuffle = sudokuComponents.numberOfLinePermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomColumns = settingRandomValuesForLines();
      const columnNumbers = Object.values(randomColumns);
      sortingLines(columnNumbers, sudokuAnswer, sortRow);
   }
}

const randomRowSorting = (sudokuAnswer) => {
   const sortRow = true;
   const reshuffle = sudokuComponents.numberOfLinePermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomRows = settingRandomValuesForLines();
      const rowNumbers = Object.values(randomRows);
      sortingLines(rowNumbers, sudokuAnswer, sortRow);
   }
}

const settingRandomValuesForAreas = () => {
   const area = sudokuComponents.sudokuAreas;
   const areaOne = getRandomValue(area);
   let areaTwo = getRandomValue(area);
   while (areaOne === areaTwo) {
      areaTwo = getRandomValue(area);
   }
   return { areaOne, areaTwo }
}

const sortingAreas = (arrayAreas, matrixSudoku, flag) => {
   const size = sudokuComponents.sudokuLines;
   const area = sudokuComponents.sudokuAreas;
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
   const reshuffle = sudokuComponents.numberOfAreasPermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomHorizontalAreas = settingRandomValuesForAreas();
      const horizontalAreaNumbers = Object.values(randomHorizontalAreas);
      sortingAreas(horizontalAreaNumbers, sudokuAnswer, sortHorizontal)
   }
}

const randomAreaVerticalSorting = (sudokuAnswer) => {
   const sortHorizontal = false;
   const reshuffle = sudokuComponents.numberOfAreasPermutations;
   for (let counter = 0; counter < reshuffle; counter++) {
      const randomVerticalAreas = settingRandomValuesForAreas();
      const verticalAreaNumbers = Object.values(randomVerticalAreas);
      sortingAreas(verticalAreaNumbers, sudokuAnswer, sortHorizontal)
   }
}

const allSorts = () => {
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
   const size = sudokuComponents.sudokuLines;
   const completedSudoku = allSorts();
   const getSudoku = generationTwoBaseSudoku();
   const getAnEmptySudoku = getSudoku.sudokuSolution;
   let counter = 0;
   const numberOfFilledCellsForNLevel = difficultyNumber;
   const partialSudoku = [...getAnEmptySudoku];
   sudokuFilling(partialSudoku, completedSudoku, size, numberOfFilledCellsForNLevel, counter);
   return partialSudoku;
}

const easyLevel = () => {
   const numberOfFilledCellsForAnEasyLevel = 60;
   const newEasySudoku = partiallyCompleteSudoku(numberOfFilledCellsForAnEasyLevel);
   console.log('easy', newEasySudoku);
   return newEasySudoku;
}

const mediumLevel = () => {
   const numberOfFilledCellsForAnMediumLevel = 50;
   const newMediumSudoku = partiallyCompleteSudoku(numberOfFilledCellsForAnMediumLevel);
   console.log('medium', newMediumSudoku);
   return newMediumSudoku;
}

const hardLevel = () => {
   const numberOfFilledCellsForAnHardLevel = 40;
   const newHardSudoku = partiallyCompleteSudoku(numberOfFilledCellsForAnHardLevel);
   console.log('hard', newHardSudoku);
   return newHardSudoku;
}

const e = easyLevel();
const m = mediumLevel();
const h = hardLevel();