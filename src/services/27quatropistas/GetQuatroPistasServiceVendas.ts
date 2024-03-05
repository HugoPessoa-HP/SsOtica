import { api } from '../../API';
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class Get04PistasVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`44447899001213&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { Get04PistasVendas_Service }