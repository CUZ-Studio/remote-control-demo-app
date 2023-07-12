export default function randomIntsFromInterval(numToBeExcluded: number) {
  const underOneHundred = Array.from(Array(99), (_, index) => index + 1);
  const availableOptions = underOneHundred.filter((val) => val !== numToBeExcluded);

  const shuffled = [...availableOptions].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 2);
}
