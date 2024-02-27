import { api } from '../../API'
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetExpressVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetExpressVendas_Service }