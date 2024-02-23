import { api } from '../../API';
import moment from 'moment';

class GetBarramaresVendas_Service{
    async execute(){

        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        const vendas = await api.get(`42816990000180&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetBarramaresVendas_Service }