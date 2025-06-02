export const evaluateExpression = (expression: string): string => {
  try {
    // Handle special functions
    let processedExpression = expression
      // Replace scientific constants
      .replace(/e/g, Math.E.toString())
      .replace(/μ/g, '0.000001')
      // Replace sin with JavaScript Math.sin
      .replace(/sin\(([^)]+)\)/g, (_, angle) => {
        return Math.sin(parseFloat(angle)).toString();
      })
      // Replace deg with conversion to radians
      .replace(/deg\(([^)]+)\)/g, (_, degrees) => {
        return (parseFloat(degrees) * Math.PI / 180).toString();
      });

    // Only evaluate if the expression doesn't end with an operator
    if (/[+\-*/]$/.test(processedExpression)) {
      return '';
    }

    // Use Function constructor for evaluation (safer than eval)
    const result = Function(`'use strict'; return (${processedExpression})`)();
    
    // Format the result
    if (Number.isInteger(result)) {
      return result.toString();
    } else {
      // Limit decimal places to 8
      return parseFloat(result.toFixed(8)).toString();
    }
  } catch (error) {
    console.error('Evaluation error:', error);
    return 'Error';
  }
};

export const formatNumberWithCommas = (number: string): string => {
  // Don't format if it's an error message
  if (number === 'Error') return number;

  // Split by decimal point
  const parts = number.split('.');
  
  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Join back with decimal part if exists
  return parts.join('.');
};

export const isValidExpression = (expression: string): boolean => {
  // Check if expression is empty
  if (!expression) return false;

  // Check for invalid syntax
  try {
    // Simple check for mismatched parentheses
    let parenthesesCount = 0;
    for (const char of expression) {
      if (char === '(') parenthesesCount++;
      if (char === ')') parenthesesCount--;
      if (parenthesesCount < 0) return false;
    }
    if (parenthesesCount !== 0) return false;

    // Check if expression ends with an operator
    if (/[+\-*/]$/.test(expression)) return false;

    return true;
  } catch (error) {
    return false;
  }
};