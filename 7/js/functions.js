const checkLength = (string, length) => (string.length) <= length;

checkLength('проверяемая строка', 20);


function isPalindrome(string) {
  return string.split('').reverse().join('') === string;
}

isPalindrome('456654');


function extractNumber(string){
  const myNumber = string.match(/\d/g).map(Number);
  return + myNumber.join('');
}

extractNumber('2023 год');


function threeOptions(origStr, lengthStr, withSymbol) {
  while(origStr.length < lengthStr){
    if(withSymbol.length + origStr.length > lengthStr){
      withSymbol = withSymbol.slice(0,lengthStr - origStr.length);
    }
    origStr = withSymbol + origStr;
  }
  return origStr;
}

threeOptions('qwerty', 4, '0');
