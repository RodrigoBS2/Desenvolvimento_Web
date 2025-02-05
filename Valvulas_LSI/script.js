document.addEventListener('DOMContentLoaded', function () {
    const bitButtons = document.querySelectorAll('.bit-button');
    const sendBtn = document.getElementById('send-btn');

    // Inicializa os bits com valor 0
    let bits = new Array(8).fill(0);

    // Função para alternar o valor dos bits e atualizar visualmente
    bitButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bitIndex = this.dataset.bit;
            // Alterna entre 0 e 1 no array de bits
            bits[bitIndex] = bits[bitIndex] === 0 ? 1 : 0;
            // Atualiza o texto do botão e o estado abaixo dele
            this.textContent = bits[bitIndex];
            document.getElementById(`state${bitIndex}`).textContent = bits[bitIndex] === 1 ? 'Ligado' : 'Desligado';
        });
    });

    // Função para enviar o byte via HTTP
    sendBtn.addEventListener('click', function () {
        // Calcula o valor do byte a partir do array de bits
        const byteValue = bits.reduce((acc, bit, index) => acc + (bit << (7 - index)), 0);

        console.log("Byte a ser enviado:", byteValue);

        // Substituir pelo endereço IP e porta do servidor
        const serverUrl = 'http://127.0.0.1:5000/byte'; 

        // Envia o byte usando uma requisição HTTP POST
        fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ byte: byteValue })
        })
        .then(response => {
            if (response.ok) {
                console.log(`Sucesso: Byte ${byteValue} enviado com sucesso.`);
                return response.json();
            } else {
                throw new Error(`Erro ao enviar o byte. Status: ${response.status}`);
            }
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });
});
