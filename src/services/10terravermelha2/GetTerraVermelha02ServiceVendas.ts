import { api } from '../../API'
import moment from 'moment';

class GetTerraVermelha02Vendas_Service{
    async execute(){

        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        const vendas = await api.get(`40248658000131&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetTerraVermelha02Vendas_Service }