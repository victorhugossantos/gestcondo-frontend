export const formatarCPF = (cpf) => {
    return cpf
        .replace(/\D/g, "") // Remove todos os caracteres não numéricos
        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2") // Adiciona o traço
        .substring(0, 14); // Limita o tamanho a 14 caracteres (incluindo pontos e traço)
  }

export const formatarTelefone = (valor) => {
    return valor
      .replace(/\D/g, "") // Remove todos os caracteres não numéricos
      .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona o parêntese e espaço
      .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o traço
      .substring(0, 15); // Limita o tamanho a 15 caracteres (incluindo parênteses, espaço e traço)
  }

// Validação usando biblioteca

export const validarCPF = (cpf) => {
    const cpfLimpo = cpf.replace(/\D/g, "");
    return cpf.isValid(cpfLimpo) // Remove caracteres não numéricos

}