// Calculadora simples - Stephanie Nunes :)
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const calculadora = (num1, num2, operacao) => {
    switch (operacao) {
        case 'somar':
            return num1 + num2;
        case 'subtrair':
            return num1 - num2;
        case 'multiplicar':
            return num1 * num2;
        case 'dividir':
            if (num2 === 0) {
                return "Erro: Não é possível dividir por zero";
            }
            return num1 / num2;
        default:
            return "Operação inválida";
    }
};

rl.question('Digite o primeiro número: ', (primeiroNum) => {
    rl.question('Digite o segundo número: ', (segundoNum) => {
        rl.question('Digite a operação (somar, subtrair, multiplicar, dividir): ', (operacao) => {
            const num1 = parseFloat(primeiroNum);
            const num2 = parseFloat(segundoNum);
            const resultado = calculadora(num1, num2, operacao);
            console.log(`Resultado: ${resultado}`);
            rl.close();
        });
    });
});
