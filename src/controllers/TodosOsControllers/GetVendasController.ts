import { Request, Response } from "express";
import { GetVendasService } from "../../services/TodosOsServices/GetVendas";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetGeralVendas {
    async ex(req: Request, res: Response){
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('Relatorio');

        sheet.columns = [
            { header: 'nome', key: 'nome' },
            { header: 'numero', key: 'numero' },
            { header: 'email', key:'email' }
        ]

        const arrayCNPJ = ['Digitar CNPJ das Lojas para funcionar'];
   
        const arraylength = arrayCNPJ.length;


        var i, j, v;

        var nomeArray = [];
        var numeroArray = [];
        var emailArray = [];
        
        for(i = 0; i < arraylength; i++){
            console.log(i);
            const getVendas = new GetVendasService();
            const vendas = await getVendas.execute(arrayCNPJ[i]);
            const data = await vendas.data;
            const lengthData = data.length;

            for(j = 0; j < lengthData; j++){
                
                const nome = await data[j].cliente.nome;
                if((nome == null) || (nome == undefined) || (nome == '')){
                    var nomeFinal = "Não informou nome";
                } else {
                    var nomeFinal = JSON.stringify(nome);
                }
                await nomeArray.push(nomeFinal);


                const numero = await data[j].cliente.telefones;
                if((numero == null) || (numero == undefined) || (numero == '')){
                    var numeroFinal = "Não informou número";
                } else {
                    //console.log("Estou aqui")
                    var primeiroNumero = numero[0];
                    var valorNumero = JSON.stringify(primeiroNumero);                    
                    var numeroFinal = valorNumero.replace(/\D/g, '');
                }
                await numeroArray.push(numeroFinal);

                
                const email = await data[j].valor_liquido;
                if((email == null) || (email == undefined)){
                    var emailFinal = "Não informou email";
                } else {  
                    var emailFinal = await JSON.stringify(email);
                }
                await emailArray.push(emailFinal);
            }

        }
        const valoresLength = nomeArray.length;

        console.log(valoresLength)
        for(v = 0; v < valoresLength; v++){ 
            sheet.addRow({
                nome: nomeArray[v],
                numero: numeroArray[v],
                email: emailArray[v],
                })
        }
        const dataAnterior = await dataAtualizada();
        sheet.workbook.xlsx.writeFile(`Relatório Geral de Vendas - ${dataAnterior}.xlsx`);
        console.log("Relatorio Criado");
        return res.json("Fim da Rota!");
    }
}

export { GetGeralVendas }