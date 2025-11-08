// Create a JavaScript function called toKebabCase that converts strings to kebab-case format. Follow these sequential steps:
//
// Step 1: First, validate the input - throw a descriptive error if the input is not a string, and handle null/undefined cases.
//
// Step 2: Then, normalize the input by handling multiple formats (camelCase, PascalCase, snake_case, spaces, dot.case) and splitting them into individual words while preserving numbers.
//
// Step 3: Finally, join the words with hyphens and convert everything to lowercase.
//
// Examples:
// - toKebabCase('firstName') → 'first-name'
// - toKebabCase('user_id') → 'user-id'
// - toKebabCase('SCREEN NAME') → 'screen-name'
// - toKebabCase('mobile.number.2') → 'mobile-number-2'
// - toKebabCase('') → ''
// - toKebabCase(null) → throw Error('Input must be a string')
//
// Include comprehensive error handling and handle edge cases like consecutive delimiters, leading/trailing delimiters, and empty strings.

function toKebabCase(input) {
  // Step 1: Validate the input
  if (input === null || input === undefined) {
    throw new Error('Input must be a string');
  }
  
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  // Handle empty strings
  const trimmed = input.trim();
  if (trimmed === '') {
    return '';
  }
  
  // Step 2: Normalize the input by handling multiple formats and splitting into words
  const words = trimmed
    // Handle transitions from lowercase to uppercase (camelCase/PascalCase)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Handle transitions from letters to numbers
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    // Handle transitions from numbers to letters
    .replace(/(\d)([a-zA-Z])/g, '$1 $2')
    // Replace various delimiters (underscores, dots, spaces) with spaces
    .replace(/[_.\s]+/g, ' ')
    // Split into individual words
    .split(' ')
    // Filter out empty strings from consecutive delimiters or leading/trailing delimiters
    .filter(word => word.length > 0);
  
  // Step 3: Join the words with hyphens and convert to lowercase
  return words
    .map(word => word.toLowerCase())
    .join('-');
}

module.exports = toKebabCase;
