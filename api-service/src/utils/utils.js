const PASSWORD_SIZE = 32;

function generatePassword() {  
    let numberChars = "0123456789";
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerChars = "abcdefghijklmnopqrstuvwxyz";
    let allChars = numberChars + upperChars + lowerChars;
    let randPasswordArray = Array(PASSWORD_SIZE);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}


module.exports = {
    generatePassword,
}