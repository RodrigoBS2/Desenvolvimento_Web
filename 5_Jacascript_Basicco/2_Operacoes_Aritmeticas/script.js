/* 
    + Adição
    - Subtração
    * Multiplicação
    / Divisão
    % Resto da divisão
    ++ Incremento
    -- Decremento
    
    Incremento e decremento:
        - Existe uma diferença na ordem de ++ e --. Por exemplo:
        i) var a = 1;
           var b = ++a;    - Aqui b está recebendo a + 1;
           var c = a++;    - Aqui é realizado duas opreções na seguinte ordem: 
                             c = a e depois a = a + 1. Perceba que c não recebe a + 1, 
                             apenas c = a.
*/

var a = 17;
var b = 15;
var c = a % b;      // c = 2
c++;        // c = 2 depois c = 3
var d = 20;
d = d + c;      // d = 23

console.log(d);
a = d--;
console.log(a);     // a = d
console.log(d);     // d = d - 1
