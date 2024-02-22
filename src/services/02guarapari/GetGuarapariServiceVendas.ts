import axios from 'axios'
import moment from 'moment';

class GetGuarapariVendas_Service{
    async execute(){

        const api = await axios.create({
            baseURL: 'https://app.ssotica.com.br/api/v1/integracoes/vendas/periodo?cnpj=',
            headers: {
                'Authorization': 'Bearer KyhmIwwbbttTtiTynlrPKkyla0wOWxNDKBuqBbgka3xGTdOsniwagsqVIISi'
            }
        })

        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        const vendas = await api.get(`44690704000109&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetGuarapariVendas_Service }