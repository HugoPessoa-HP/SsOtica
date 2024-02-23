import { api } from '../../API'
import moment from 'moment';

class GetMarcilio02Vendas_Service{
    async execute(){

        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        const vendas = await api.get(`45517253000175&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetMarcilio02Vendas_Service }