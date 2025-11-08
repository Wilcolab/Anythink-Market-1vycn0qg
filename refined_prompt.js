// Write a JavaScript function toCamelCase that converts strings to camelCase format with comprehensive error handling and edge case management.
// 
// Requirements:
// - Handle various input formats: snake_case, kebab-case, PascalCase, SCREAMING_SNAKE_CASE, and space-separated words
// - Validate input: throw a descriptive error if input is not a string
// - Handle edge cases: empty strings, null, undefined, strings with numbers, consecutive delimiters, leading/trailing delimiters
// - Preserve numbers in the string appropriately
// - Return empty string for empty input after trimming
// 
// Examples:
// - toCamelCase('first name') → 'firstName'
// - toCamelCase('user_id') → 'userId'
// - toCamelCase('SCREEN_NAME') → 'screenName'
// - toCamelCase('mobile-number') → 'mobileNumber'
// - toCamelCase('user-profile-2') → 'userProfile2'
// - toCamelCase('__leading__delimiters__') → 'leadingDelimiters'
// - toCamelCase('') → ''
// - toCamelCase(null) → throw Error('Input must be a string')
// - toCamelCase(123) → throw Error('Input must be a string')
// 
// Implement the function with proper error handling and validation.

function toCamelCase(input) {
  // Validate input type
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
  
  // Split on various delimiters and handle different cases
  const words = trimmed
    // Handle transitions from lowercase to uppercase (camelCase/PascalCase)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Replace delimiters with spaces
    .replace(/[-_.\s]+/g, ' ')
    // Split into words
    .split(' ')
    // Filter out empty strings from consecutive delimiters
    .filter(word => word.length > 0)
    // Convert each word appropriately
    .map((word, index) => {
      const lowerWord = word.toLowerCase();
      // First word stays lowercase, subsequent words capitalize first letter
      if (index === 0) {
        return lowerWord;
      }
      return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    });
  
  return words.join('');
}

// Create a function that converts strings to dot.case format
function toDotCase(input) {
  // Validate input type
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
  
  // Split on various delimiters and handle different cases
  const words = trimmed
    // Handle transitions from lowercase to uppercase (camelCase/PascalCase)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Replace delimiters with spaces
    .replace(/[-_\s]+/g, ' ')
    // Split into words
    .split(' ')
    // Filter out empty strings from consecutive delimiters
    .filter(word => word.length > 0)
    // Convert to lowercase
    .map(word => word.toLowerCase());
  
  return words.join('.');
}

/**
 * Converts a string to camelCase format
 * @param {string} input - The string to convert
 * @returns {string} The converted camelCase string
 * @throws {Error} If input is not a string
 * @example
 * toCamelCase('first name') // returns 'firstName'
 * toCamelCase('user_id') // returns 'userId'
 * toCamelCase('SCREEN_NAME') // returns 'screenName'
 */

/**
 * Converts a string to dot.case format
 * @param {string} input - The string to convert
 * @returns {string} The converted dot.case string
 * @throws {Error} If input is not a string
 * @example
 * toDotCase('firstName') // returns 'first.name'
 * toDotCase('user_id') // returns 'user.id'
 * toDotCase('SCREEN NAME') // returns 'screen.name'
 */
