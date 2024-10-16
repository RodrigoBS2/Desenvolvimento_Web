// app.js

document.addEventListener('DOMContentLoaded', function() {
    const bitButtons = document.querySelectorAll('.bit-button');
    const sendBtn = document.getElementById('send-btn');

    // Inicializa o valor dos bits como 0
    let bits = new Array(8).fill(0);

    // Função para alternar o valor dos bits
    bitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bitIndex = this.dataset.bit;
            // Alterna entre 0 e 1
            bits[bitIndex] = bits[bitIndex] === 0 ? 1 : 0;
            // Atualiza o texto do botão para refletir o valor
            this.textContent = bits[bitIndex];
        });
    });

    // Função para enviar o byte
    sendBtn.addEventListener('click', function() {
        // Converte o array de bits em um byte (número de 0 a 255)
        let byteValue = bits.reduce((acc, bit, index) => acc + (bit << (7 - index)), 0);
        console.log("Byte enviado: ", byteValue);

        // Aqui, você vai enviar o byte para o microcontrolador via Wi-Fi (Ethernet)
        fetch('http://seu-endereco-ip/byte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ byte: byteValue })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
