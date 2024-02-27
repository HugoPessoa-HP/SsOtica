import { api } from '../../API'
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetTerraVermelhaVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`40248658000131&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetTerraVermelhaVendas_Service }