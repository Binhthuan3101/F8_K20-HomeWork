function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
console.log(isPrime(11));

function isDivisibleBy15(num) {
  return num % 3 === 0 && num % 5 === 0;
}

console.log(isDivisibleBy15(15));


function printNumberTriangle(n) {
    if (n <= 0) return;
    for (let i = 1; i <= n; i++){
        let rowStr = "";
        for (let j = 1; j <= i; j++){
            let character = "";
            if (isDivisibleBy15(j)) {
                character = "#";
            } else if (isPrime(j)) {
                character = "*";
            }
            else {
                character = j;
            }

            if (j === 1) {
                rowStr += character;
            } else {
                rowStr += " " + character;
            }
        }
        console.log(rowStr);

        if (i % 2 === 0) {
            let dash = "";
            for (let a = 1; a <= i; a++){
                dash += "-";
            }
            console.log(dash);
            
        }
    }
}


console.log(printNumberTriangle(7));
