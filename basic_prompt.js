// Write a function called toCamelCase that converts strings to camelCase.
// For example, toCamelCase('hello world') should return 'helloWorld'.

function toCamelCase(str) {
  return str
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}
