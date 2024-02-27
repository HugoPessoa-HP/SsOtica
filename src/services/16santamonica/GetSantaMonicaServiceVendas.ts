import { api } from '../../API';
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetSantaMonicaVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`44448029000106&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetSantaMonicaVendas_Service }