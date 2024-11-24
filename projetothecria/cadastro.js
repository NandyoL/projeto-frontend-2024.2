    // Formatação do CPF
    document.getElementById('cpf').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        const formattedValue = value.replace(/(\d{3})(\d)/, '$1.$2')
                                     .replace(/(\d{3})(\d)/, '$1.$2')
                                     .replace(/(\d{2})$/, '-$1');
        e.target.value = formattedValue;
    });
    
    // Formatação do CEP
    document.getElementById('cep').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        const formattedValue = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = formattedValue;
    });
    
    // Formatação dos Telefones
    function formatarTelefone(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            let formattedValue = value.replace(/^(\d{2})(\d)/, '($1)$2');
            if (value.length > 10) {
                formattedValue = formattedValue.replace(/(\d{5})(\d)/, '$1-$2');
            } else {
                formattedValue = formattedValue.replace(/(\d{4})(\d)/, '$1-$2');
            }
            e.target.value = formattedValue;
        });
    }
    
    formatarTelefone(document.getElementById('telefoneCelular'));
    formatarTelefone(document.getElementById('telefoneFixo'));
    
    // Validação de CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11) return false;
    
        let soma = 0;
        let resto;
    
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
        }
        resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
    
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
        }
        resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
    
        return true;
    }
    
    // Preenchimento automático do endereço
    document.getElementById('cep').addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('endereco').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                    } else {
                        alert('CEP não encontrado.');
                    }
                })
                .catch(() => alert('Erro ao buscar o CEP.'));
        }
    }); 
    
// Confirmação da senha
document.getElementById('formulario').addEventListener('submit', function(event) {
    let senha = document.getElementById('senha').value;
    let confirmaSenha = document.getElementById('confirmaSenha').value;
    
    if (senha !== confirmaSenha) {
        event.preventDefault();  // Impede o envio do formulário
        document.getElementById('message').textContent = "As senhas não coincidem.";
    }
});


// Salvando login no localStorage
const formulario = document.getElementById("formulario");

formulario.addEventListener('submit', function(event) {
    // Validação da confirmação da senha
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirmaSenha").value;

    if (senha !== confirmaSenha) {
        event.preventDefault();  // Impede o envio do formulário
        document.getElementById('mensagemsenha').textContent = 'As senhas não coincidem.';
        return; // Não prossegue para salvar os dados no localStorage
    }

    // Se as senhas coincidem, prossegue para salvar os dados
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const login = document.getElementById("login").value;

    const usuario = {
        nome: nome,
        cpf: cpf,
        login: login,
        senha: senha
    };

    console.log(usuario);

    // Salva o usuário no localStorage
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redireciona após um pequeno atraso
    setTimeout(function() {
        console.log("Usuário cadastrado com sucesso!");
        window.location.href = 'login.html'; // Redireciona para a página de login
    }, 1500);  // Atraso de 1.5 segundos
});

