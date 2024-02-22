import { api } from "../../API";
import { SalvarVendas } from "../../API-Google-Sheets";
import moment from 'moment';

class GetVendas_Service{
    async execute(){

        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('Relatorio')

        const dataAnterior = await moment().subtract(1 , "days").format("YYYY-MM-DD");
        const vendas = await api.get(`33879704000135&inicio_periodo=${dataAnterior}&fim_periodo=${dataAnterior}`);

        const data = await vendas.data;
        const lengthData = data.length;
        const vendasSalvar = await new SalvarVendas();

        sheet.columns = [
            { header: 'nome', key: 'nome' },
            { header: 'numero', key: 'numero' },
            { header: 'email', key:'email' }
        ]
      
/*      var nomeArray = [];
        var numeroArray = [];
        var emailArray = [];

        for(let i = 0; i < lengthData; i++){
            var nomeV = await data[i].cliente.nome;
            nomeV = await JSON.stringify(nomeV);
            await nomeArray.push(nomeV);

            var numeroV = await data[i].cliente.telefones;
            var values = await Object.values(numeroV[0]);
            numeroV = await JSON.stringify(values);
            numeroV = await numeroV.replace(/\D/g,'');
            await numeroArray.push(numeroV);

            var emailV = await data[i].valor_liquido;
            emailV = await JSON.stringify(emailV);
            await emailArray.push(emailV);

            sheet.addRow({
                nome: nomeArray[i],
                numero: numeroArray[i],
                email: emailArray[i]
            })
          vendasSalvar.salvarVendas({
                nome,
                numeroMudado,
                email,
            });
        */

        }
        //sheet.workbook.xlsx.writeFile(`Relatorio-${dataAnterior}.xlsx`)
/*       var matrizz = [[]];
        for(let i=0; i < lengthData; i++){
            for(let j=0; j < 1; j++){
                if(j == 0){ 
                    matrizz[i][j] <= nomeArray[i];
                }else if(j == 1){
                    matrizz[i][j] <= emailArray[i];
                }
            }
        } */
        //console.log(matrizz)
        
        //console.log(lengthData);
        //return vendas.data;
    }
}

export { GetVendas_Service }