// Basic Calculator
document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        const display = document.getElementById('operation');
        const num1 = document.getElementById('num1');
        const num2 = document.getElementById('num2');

        if (!isNaN(value)) {
            // If number is clicked, concatenate to the existing value
            if (!num1.value) {
                num1.value = value; // Start entering the first number
            } else if (!display.value) {
                num1.value += value; // Concatenate to the first number
            } else {
                num2.value += value; // Concatenate to the second number
            }
        } else if (value === 'C') {
            // Clear all
            num1.value = '';
            num2.value = '';
            display.value = '';
            document.getElementById('calcResult').textContent = '';
        } else if (value === '=') {
            // Perform calculation
            calculator(parseFloat(num1.value), parseFloat(num2.value), display.value)
                .then(result => document.getElementById('calcResult').textContent = `Result: ${result}`)
                .catch(error => document.getElementById('calcResult').textContent = error);
        } else {
            // Set operation (e.g., +, -, *, /)
            display.value = value;
        }
    });
});

function calculator(num1, num2, operation) {
    return new Promise((resolve, reject) => {
        switch (operation) {
            case '+':
                resolve(num1 + num2);
                break;
            case '-':
                resolve(num1 - num2);
                break;
            case '*':
                resolve(num1 * num2);
                break;
            case '/':
                if (num2 === 0) {
                    reject("Error: Cannot divide by zero");
                } else {
                    resolve(num1 / num2);
                }
                break;
            default:
                reject("Error: Invalid operation");
        }
    });
}

// Square Iterator
// Square Iterator
// Square Iterator
document.getElementById('squareButton').addEventListener('click', () => {
    const input = document.getElementById('numbers').value;
    const numbers = input.split(',')
        .map(num => parseFloat(num.trim())) // Parse and trim spaces
        .filter(num => !isNaN(num)); // Keep only valid numbers

    // Check for valid numbers
    if (numbers.length === 0) {
        document.getElementById('squareResult').textContent = "Please enter valid numbers.";
        return; // Exit if there are no valid numbers
    }

    let squareIterator = {
        numbers: numbers,
        [Symbol.iterator]() {
            let index = 0;
            return {
                next: () => {
                    if (index < this.numbers.length) {
                        return { value: this.numbers[index++] ** 2, done: false }; // Increment index
                    } else {
                        return { done: true };
                    }
                }
            };
        }
    };

    let squares = [];
    for (let square of squareIterator) {
        if (square !== undefined) { // Ensure valid square value
            squares.push(square);
        }
    }

    document.getElementById('squareResult').textContent = `Squares: ${squares.join(', ')}`;
});


// Prime Number Generator
document.getElementById('generatePrimes').addEventListener('click', () => {
    const limit = parseInt(document.getElementById('primeLimit').value);
    const primeResult = document.getElementById('primeResult');
    primeResult.textContent = "Prime Numbers: ";

    const primes = primeGenerator(limit);
    let primeNumbers = [];
    for (let prime of primes) {
        primeNumbers.push(prime);
    }
    primeResult.textContent += primeNumbers.join(', ');
});

function* primeGenerator(limit) {
    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    let num = 2;
    while (num <= limit) {
        if (isPrime(num)) {
            yield num;
        }
        num++;
    }
}
