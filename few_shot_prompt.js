// Write a JavaScript function toCamelCase that converts strings to camelCase.
// Here are some examples:
// first name → firstName
// user_id → userId
// SCREEN_NAME → screenName
// mobile-number → mobileNumber
// Implement the function to handle these cases.

function toCamelCase(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
    .replace(/^[A-Z]/, char => char.toLowerCase());
}
