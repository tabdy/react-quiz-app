function ShuffleArray(array) {
  let lastUnshuffledIndex = array.length;
  let randomIndex;
  let valueHolder;

  while (lastUnshuffledIndex) {
    randomIndex = Math.floor(Math.random() * lastUnshuffledIndex--)
    valueHolder = array[lastUnshuffledIndex]
    array[lastUnshuffledIndex] = array[randomIndex]
    array[randomIndex] = valueHolder
  }

  return array;
}

export default ShuffleArray;