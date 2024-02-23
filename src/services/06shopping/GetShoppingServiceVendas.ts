import { api } from '../../API'
import moment from 'moment';

class GetShoppingVendas_Service{
    async execute(){

        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        const vendas = await api.get(`39402286000177&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetShoppingVendas_Service }