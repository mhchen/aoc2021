import { parseInput } from '../utils';

const parsedBinaryNumbers = parseInput();

type Tally = {
  zeroes: number;
  ones: number;
};

function tallyNumbers(binaryNumbers: string[], index: number) {
  const tally: Tally = {
    zeroes: 0,
    ones: 0,
  };

  for (const line of binaryNumbers) {
    if (line[index] === '0') {
      tally.zeroes++;
    } else {
      tally.ones++;
    }
  }
  return tally;
}

type MostOrLeast = 'most' | 'least';

function findCommonDigit({ zeroes, ones }: Tally, mostOrLeast: MostOrLeast) {
  if (mostOrLeast === 'most') {
    return zeroes > ones ? 0 : 1;
  }
  return zeroes > ones ? 1 : 0;
}

function calculateRating(mostOrLeast: MostOrLeast) {
  let filteredBinaryNumbers = [...parsedBinaryNumbers];
  const { length } = parsedBinaryNumbers[0];

  for (let i = 0; i < length; i++) {
    const tally = tallyNumbers(filteredBinaryNumbers, i);

    const commonDigit = findCommonDigit(tally, mostOrLeast);
    filteredBinaryNumbers = filteredBinaryNumbers.filter(
      (line) => line[i] === commonDigit.toString(),
    );
    if (filteredBinaryNumbers.length === 1) {
      break;
    }
  }
  return parseInt(filteredBinaryNumbers[0], 2);
}

const oxygenRating = calculateRating('most');
const co2Rating = calculateRating('least');

console.log(oxygenRating * co2Rating);
