import { parseInput } from '../utils';

const hexNumber = parseInput()[0];

const binaryNumber = parseInt(hexNumber, 16).toString(2);

const bits = binaryNumber.split('');

const versionBinary = bits.splice(0, 3).join('');
const packetTypeIDBinary = bits.splice(0, 3).join('');

const literalValueTokens: string[] = [];
while (true) {
  const segment = bits.splice(0, 5);
  const shouldContinue = segment[0] === '1';

  literalValueTokens.push(...segment.slice(1));
}
