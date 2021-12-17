import { parseInput } from '../utils';

const map: Record<string, string> = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
};

const binaryNumber = parseInput()[0]
  .split('')
  .map((hexNumber) => map[hexNumber])
  .join('');
console.log(binaryNumber);

const allBits = binaryNumber.split('');

function binaryToDecimal(binaryString: string) {
  return parseInt(binaryString, 2);
}

function bitsToDecimal(bits: string[]) {
  return binaryToDecimal(bits.join(''));
}

let versionTotal = 0;

function findClosestMultipleOf4(initial: number) {
  let i = initial;
  while (i % 4 !== 0) {
    i++;
  }
  return i;
}

function parsePacket(bits: string[]): number {
  const bitsCopy = [...bits];
  console.log(bitsCopy.join(''));
  console.log(bitsCopy.length);
  let index = 0;

  if (/^0*$/.test(bits.join(''))) {
    return 0;
  }
  const versionBinary = bitsCopy.splice(0, 3).join('');
  index += 3;
  const packetTypeIDBinary = bitsCopy.splice(0, 3).join('');
  index += 3;

  const packetTypeID = binaryToDecimal(packetTypeIDBinary);
  const version = binaryToDecimal(versionBinary);
  versionTotal += version;
  console.log({ version, packetTypeID });

  if (packetTypeID === 4) {
    const literalValueTokens: string[] = [];

    while (true) {
      console.log('parsing literal');
      const segment = bitsCopy.splice(0, 5);
      index += 5;
      const shouldContinue = segment[0] === '1';

      literalValueTokens.push(...segment.slice(1));

      if (!shouldContinue) {
        break;
      }
    }
    console.log({ index: findClosestMultipleOf4(index) });
    return findClosestMultipleOf4(index);
  }

  const lengthTypeID = bitsCopy.shift();
  if (lengthTypeID === '0') {
    const totalBitLength = bitsToDecimal(bitsCopy.splice(0, 15));
    index += 15;
    let totalParsed = 0;
    console.log('type 0');
    while (totalParsed < totalBitLength) {
      totalParsed += parsePacket(bitsCopy);
      if (totalParsed === 0) {
        break;
      }
      index += totalParsed;
      bitsCopy.splice(0, totalParsed);
      console.log({ totalParsed, totalBitLength });
    }
    console.log('post type 0');
  } else {
    const totalSubpackets = bitsToDecimal(bitsCopy.splice(0, 11));
    index += 11;

    console.log('type 1');
    console.log({ totalSubpackets });
    for (let i = 0; i < totalSubpackets; i++) {
      console.log(`packet ${i}`);
      const spliceTotal = parsePacket(bitsCopy);
      index += spliceTotal;
      bitsCopy.splice(0, spliceTotal);
    }
    console.log('post type 1');
  }
  return index;
}

parsePacket(allBits);

console.log(versionTotal);
