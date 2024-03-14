import { Request, Response } from "express";
import { GetVendasService } from "../../services/TodosOsServices/GetVendas";
import dataAtualizada from "../../VendasFuncoes/dataAtualizada";

class GetGeralVendas {
    async ex(req: Request, res: Response){
        console.log("Estou Aqui")
        const ExcelJS = require('exceljs');
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('Relatorio')

        sheet.columns = [
            { header: 'nome', key: 'nome' },
            { header: 'numero', key: 'numero' },
            { header: 'email', key:'email' }
        ]

        const arrayCNPJ = ['44447899000918', '44447899000837', '44447899000594', '44447899001566', '44447899001302',
                       '40248658000131', '44447899001485', '44447899001051', '66286213000130', '40926713000103',
                       '44447899001728', '44447899000160', '43229630000145', '44447899001809', '44690704000109',
                       '44447899000756', '48019477000145',
                       '44447899000403', '44447899000675', '44447899000322', '89982746000151', '44447899000241', 
                       '44447899001213', '44447899001132', '83214449000180', '82677480000194',
                       '29132921000190', '48940172000171', '74449580000135', '03034259000141'];
   
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
                if((nome === null) || (nome === undefined)){
                    var nomeFinal = "Não informou nome";
                } else {
                    var nomeFinal = JSON.stringify(nome);
                }
                await nomeArray.push(nomeFinal);
                console.log(nomeFinal)


                const numero = await data[j].cliente.telefones;
                if((numero === null) || (numero === undefined)){
                    var numeroFinal = "Não informou número";
                } else {
                    //console.log("Estou aqui")
                    var primeiroNumero = numero[0]
                    var valorNumero = JSON.stringify(primeiroNumero);
                    var numeroFinal = valorNumero.replace(/\D/g, '');
                }
                await numeroArray.push(numeroFinal);
                console.log(numeroFinal)

                
                const email = await data[j].valor_liquido;
                if((email === null) || (email === undefined)){
                    var emailFinal = "Não informou email";
                } else {  
                    var emailFinal = await JSON.stringify(email);
                }
                await emailArray.push(emailFinal);
                console.log(emailFinal)
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
        sheet.workbook.xlsx.writeFile(`Relatório Geral de Vendas - ${dataAnterior}.xlsx`)
        console.log("Relatorio Criado");
        return res.json("Fim da Rota!");
    }
}

export { GetGeralVendas }
