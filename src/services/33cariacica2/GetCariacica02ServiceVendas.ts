import { api } from '../../API';
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetCariacica02Vendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`44447899000160&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetCariacica02Vendas_Service }