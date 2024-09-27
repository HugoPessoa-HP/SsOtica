import { Request, Response } from "express";
import { GetSalesService } from "../../services/AllServices/GetSales";
import updatedDate from "../../SalesFunction/updatedDate";

class GetSalesController {
    async ex(req: Request, res: Response){
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('Relatório');

        sheet.columns = [
            { header: 'Nome', key: 'nome' },
            { header: 'Numero', key: 'numero' },
            { header: 'Email', key:'email' }
        ]

        const arrayCNPJ = ['Enter the stores CNPJ to run'];
   
        const arraylength = arrayCNPJ.length;


        var i, j, v;

        var nameArray = [];
        var numberArray = [];
        var emailArray = [];
        
        for(i = 0; i < arraylength; i++){
            console.log(i);
            const getSales = new GetSalesService();
            const sales = await getSales.execute(arrayCNPJ[i]);
            const data = await sales.data;
            const lengthData = data.length;

            for(j = 0; j < lengthData; j++){
                
                const name = await data[j].cliente.nome;
                if((name == null) || (name == undefined) || (name == '')){
                    var finalName = "Não informou nome";
                } else {
                    var finalName = JSON.stringify(name);
                }
                await nameArray.push(finalName);


                const number = await data[j].cliente.telefones;
                if((number == null) || (number == undefined) || (number == '')){
                    var finalNumber = "Não informou número";
                } else {
                    //console.log("Test");
                    var firstNumber = number[0];
                    var valueNumber = JSON.stringify(firstNumber);                    
                    var finalNumber = valueNumber.replace(/\D/g, '');
                }
                await numberArray.push(finalNumber);

                
                const email = await data[j].valor_liquido;
                if((email == null) || (email == undefined)){
                    var finalEmail = "Não informou email";
                } else {  
                    var finalEmail = await JSON.stringify(email);
                }
                await emailArray.push(finalEmail);
            }

        }
        const valuesLength = nameArray.length;

        console.log(valuesLength)
        for(v = 0; v < valuesLength; v++){ 
            sheet.addRow({
                nome: nameArray[v],
                numero: numberArray[v],
                email: emailArray[v],
                })
        }
        const previousDate = await updatedDate();
        sheet.workbook.xlsx.writeFile(`Relatório Geral de Vendas - ${previousDate}.xlsx`);
        console.log("Created");
        return res.json("Fim da RotaEnd of the Route!");
    }
}

export { GetSalesController }