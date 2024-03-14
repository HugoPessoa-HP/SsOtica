import { api } from '../../API';
import dataAtualizada from '../../VendasFuncoes/dataAtualizada';

class GetVendasService{
    async execute(lojaCNPJ: String){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`${lojaCNPJ}&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetVendasService }


