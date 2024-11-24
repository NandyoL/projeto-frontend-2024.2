var formulario = document.getElementById("formulario");

formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio do formulário para evitar recarregamento da página

    // Obtém os valores dos inputs
    let login = document.getElementById("login").value;
    let senha = document.getElementById("senha").value;

    // Valida se os campos foram preenchidos
    if (!login || !senha) {
        alert("Por favor, preencha ambos os campos.");
        return;
    }

    // Obtém os dados armazenados no localStorage
    let lS = localStorage.getItem("usuario");

    if (lS) {
        let obj = JSON.parse(lS);

        // Verifica se o login e a senha são válidos
        if (login === obj.login && senha === obj.senha) {
            
            alert("Usuário logado com sucesso.");
            window.location.href = "telaprincipal.html";
        } 
        else {  
            alert("Usuário ou senha inválidos.");
        }
    } else {
        alert("Usuário não encontrado.");
    }
});
