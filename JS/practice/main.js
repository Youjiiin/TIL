let array = [];

for (let i = 0; i < 10; i++) {
  array[i] = function () {
    return i;
  };
}

for (let j = 0; j < array.length; j++) {
  console.log(array[j]());
}
