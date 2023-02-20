const checkLength = (string, length) => (string.length) <= length;

checkLength('проверяемая строка', 20);

function isPalindrome(string) {
  return string.split('').reverse().join('') === string;
}

isPalindrome('456654');
