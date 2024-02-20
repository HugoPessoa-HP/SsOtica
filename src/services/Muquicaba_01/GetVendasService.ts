import { api } from "../../API";
import { SalvarVendas } from "../../API-Google-Sheets";
import moment from 'moment'

class GetVendasMuquicaba_Service{
    async execute(){

        const dataAtual = await moment().format('YYYY-MM-DD');
        console.log(dataAtual);
        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        console.log(dataAnterior);
        const vendas = await api.get(`33879704000135&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        const data = await vendas.data;
        const lengthData = data.length;
        const vendasSalvar = await new SalvarVendas();

        let i;

        for(i = 0; i < lengthData; i++){
            var nome = await data[i].cliente.nome;
            var numero = await data[i].cliente.telefones;
            var values = await Object.values(numero[0]);
            var numeroMudado = JSON.stringify(values);
            numeroMudado = await numeroMudado.replace(/\D/g,'');
            var email = await data[i].valor_liquido;

            await console.log(numeroMudado)

        
        vendasSalvar.salvarVendas({
                nome,
                numeroMudado,
                email,
            });
        
        }
        
        console.log(lengthData);
        return vendas.data;
    }
}

export { GetVendasMuquicaba_Service }