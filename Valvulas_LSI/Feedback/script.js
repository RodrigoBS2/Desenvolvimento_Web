document.addEventListener('DOMContentLoaded', function () {
    const bitButtons = document.querySelectorAll('.bit-button');
    const sendBtn = document.getElementById('send-btn');
    const feedbackDisplay = document.getElementById('feedback');

    let bits = new Array(8).fill(0);

    bitButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bitIndex = this.dataset.bit;
            bits[bitIndex] = bits[bitIndex] === 0 ? 1 : 0;
            this.textContent = bits[bitIndex];
            document.getElementById(`state${bitIndex}`).textContent = bits[bitIndex] === 1 ? 'Ligado' : 'Desligado';
        });
    });

    sendBtn.addEventListener('click', function () {
        const byteValue = bits.reduce((acc, bit, index) => acc + (bit << (7 - index)), 0);

        console.log("Byte a ser enviado:", byteValue);

        const serverUrl = 'http://127.0.0.1:5000/byte'; 

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
            fetchFeedback();  // Chama a função para buscar feedback
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });

    function fetchFeedback() {
        const feedbackUrl = 'http://127.0.0.1:5000/feedback';
        feedbackDisplay.textContent = 'Aguardando feedback do Arduino...'; // Mensagem de espera
        
        console.log("Solicitando feedback do Arduino..."); // Log adicionado

        const timeoutDuration = 5000; // 5 segundos
        const timeoutId = setTimeout(() => {
            feedbackDisplay.textContent = 'Tempo de espera excedido. Nenhum feedback recebido.';
        }, timeoutDuration);

        fetch(feedbackUrl)
            .then(response => {
                clearTimeout(timeoutId); // Cancela o timeout se a resposta chegar
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Erro ao buscar feedback. Status: ${response.status}`);
                }
            })
            .then(data => {
                if (data.byte !== null) {
                    feedbackDisplay.textContent = `Byte recebido do Arduino: ${data.byte}`;
                } else {
                    feedbackDisplay.textContent = 'Nenhum byte recebido do Arduino ainda.';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar feedback:', error);
                feedbackDisplay.textContent = 'Erro ao buscar feedback.';
            });
    }
});
