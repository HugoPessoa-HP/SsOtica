import { api } from '../../API';
import updatedDate from '../../SalesFunction/updatedDate';

class GetSalesService{
    async execute(store_CNPJ: String){

        const previousdate = await updatedDate();
        const sales = await api.get(`${store_CNPJ}&inicio_periodo=${previousdate}&fim_periodo=${previousdate}`);

        return sales;
    }
}

export { GetSalesService }