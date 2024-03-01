    async function verificaNumero(numero: JSON){
        if(numero !== undefined){
            var numeroMudado = await JSON.stringify(numero);
            var primeiroNumero = numeroMudado[0];
            var numeroFinal = numeroMudado.replace(/\D/g, '');
            return numeroFinal;
        } else {
            var numeroMudado = await JSON.stringify(numero)
            var numeroFinal = "Não informou numero"
            return numeroFinal;
        }
    }

export default { verificaNumero }