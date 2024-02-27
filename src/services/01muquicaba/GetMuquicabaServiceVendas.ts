import { api } from "../../API";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetMuquicabaVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`33879704000135&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetMuquicabaVendas_Service }