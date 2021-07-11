{
    //theme changer
    const checkbox = document.getElementById("checkbox");

    checkbox.addEventListener('change', () => {
        // Change the theme of the website
        document.body.classList.toggle('dark');
    })
    class Calculator {
        constructor(previousOperandText, currentOperandText) {
            this.previousOperandText = previousOperandText;
            this.currentOperandText = currentOperandText;
            this.clear();
        }

        clear() {
            this.currentOperand = '';
            this.previousOperand = '';
            $error.textContent = '';
            this.operation = undefined;
        }

        posNeg() {
            if (this.currentOperand === '') {
                $error.textContent = `first choose your number!`;
                return
            }
            if (Math.sign(this.currentOperand) === 1) {
                this.currentOperand = -Math.abs(this.currentOperand);
            } else {
                this.currentOperand = Math.abs(this.currentOperand);
            }
        }

        appendNumber(number) {
            if (this.currentOperand.length >= 21) {
                $error.textContent = `You can't add more numbers! (limit=21)`;
                return;
            }
            if (number === '.' && this.currentOperand.includes('.')){
                $error.textContent = `You can't add more decimal points!`;
                return;
            }
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

        chooseOperation(operation) {
            if (this.currentOperand === '') {
                $error.textContent = `first choose your number!`;
                return
            }
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
            $error.textContent= '';
        }

        compute() {
            let computation;
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) {
                return;
            }
            switch (this.operation) {
                case '+':
                    computation = prev + current;
                    break
                case '-':
                    computation = prev - current;
                    break
                case 'x':
                    computation = prev * current;
                    break
                case '÷':
                    computation = prev / current;
                    break
                case '%':
                    computation = (prev / current )* 100;
                    break
                default:
                    return
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = '';
        }

        updateDisplay() {
            this.currentOperandText.innerText = this.currentOperand;
            if (this.operation != null) {
                this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
            } else {
                this.previousOperandText.innerText = ''
            }
        }
    }

    const $error = document.querySelector(`.error`);
    const $numbers = document.querySelectorAll('[data-num]');
    const $operations = document.querySelectorAll('[data-operation]');
    const $equals = document.querySelector('[data-equals]');
    const $posNeg = document.querySelector('[data-posNeg]');
    const $allClear = document.querySelector('[data-allClear]');
    const $previousOperandText = document.querySelector('[data-pre]');
    const $currentOperandText = document.querySelector('[data-cur]');

    const init = () => {
        const calculator = new Calculator($previousOperandText, $currentOperandText);

        $numbers.forEach( num => {
            num.addEventListener('click', () => {
                calculator.appendNumber(num.innerText);
                calculator.updateDisplay();
            })
        })

        $operations.forEach(operation => {
            operation.addEventListener('click', () => {
                calculator.chooseOperation(operation.innerText);
                calculator.updateDisplay();
            })
        })

        $allClear.addEventListener('click', () => {
            calculator.clear();
            calculator.updateDisplay();
        })

        $equals.addEventListener('click', () => {
            $error.textContent = '';
            calculator.compute();
            calculator.updateDisplay();
        })

        $posNeg.addEventListener('click', () => {
            calculator.posNeg();
            calculator.updateDisplay();
        })
    }

    init();
}
