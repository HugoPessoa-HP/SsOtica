import axios from 'axios';
const token = process.env.TOKEN;
const tokenV = JSON.stringify(token);

const api = axios.create({
    baseURL: 'https://app.ssotica.com.br/api/v1/integracoes/vendas/periodo?cnpj=',
    headers: {
        'Authorization': `Bearer KyhmIwwbbttTtiTynlrPKkyla0wOWxNDKBuqBbgka3xGTdOsniwagsqVIISi`
    }
})

export { api }