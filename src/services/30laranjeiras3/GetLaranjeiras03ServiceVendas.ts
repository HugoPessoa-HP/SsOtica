import { api } from '../../API';
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetLaranjeiras03Vendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`44447899000160&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetLaranjeiras03Vendas_Service }