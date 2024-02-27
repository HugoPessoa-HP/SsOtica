import { api } from '../../API'
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetAeroportoVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`40254669000124&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetAeroportoVendas_Service }