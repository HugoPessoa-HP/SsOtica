import { api } from "../../API";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

class GetMuquicabaVendas_Service{
    async execute(){

        const dataAnterior = await dataAtualizada();
        const vendas = await api.get(`44447899000918&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        return vendas;
    }
}

export { GetMuquicabaVendas_Service }