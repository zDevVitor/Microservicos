// JavaScript para lidar com o registro.

document.getElementById('registerForm').addEventListener('submit', async function(event) 
{
    event.preventDefault(); // Impede o envio padrão do formulário

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = 'Usuário registrado com sucesso!';
        } else {
            document.getElementById('message').textContent = `Erro: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Erro ao tentar registrar.';
    }
});
