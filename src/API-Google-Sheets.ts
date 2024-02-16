var axios = require('axios')

interface Valores{
    nome: String,
    numero: String,
    email: String,
}

class SalvarVendas{
    async salvarVendas({nome, numero, email}: Valores){
    await axios.post('https://sheetdb.io/api/v1/bo6z9p6sxriyi',{
        "data": {
            "nome": nome,
            "numero": numero,
            "email": email
        }
    }, {
        "auth": {
            "username": "ywlesyn2",
            "password": "zaf3rnvarz6a5ei61jth"
        }
    })
    return console.log("Feito");
 }
}

export { SalvarVendas }
