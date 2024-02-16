import { api } from "../../API"
import { SalvarVendas } from "../../API-Google-Sheets";

class GetVendasMuquicaba_Service{
    async execute(){

        const vendas = await api.get('33879704000135&inicio_periodo=2024-01-26&fim_periodo=2024-02-12');

        const data = await vendas.data;
        const lengthData = data.length;
        const vendasSalvar = await new SalvarVendas();

        let i;
        let clientes = {}

        for(i = 0; i < lengthData; i++)
            var nome = data[i].cliente.nome;
            var numero = data[i].cliente.telefones.numero;
            var email = data[i].valor_liquido;

        vendasSalvar.salvarVendas({
                nome,
                numero,
                email,
            });
    
        console.log(lengthData);
        return clientes;
    }
}

export { GetVendasMuquicaba_Service }