import { api } from '../../API'
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetMarcilio02Vendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`45517253000175&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetMarcilio02Vendas_Service }