import { api } from '../../API';
import moment from 'moment';

class GetCentroVilaVelhaVendas_Service{
    async execute(){

        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        const vendas = await api.get(`44448029000106&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetCentroVilaVelhaVendas_Service }