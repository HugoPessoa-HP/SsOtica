import { api } from '../../API'
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetMarcilioVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`39892855000100&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetMarcilioVendas_Service }