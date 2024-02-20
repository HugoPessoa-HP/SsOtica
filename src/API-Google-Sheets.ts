import axios from 'axios';

interface Valores{
    nome: String,
    numeroMudado: String,
    email: String,
}

class SalvarVendas{
    async salvarVendas({nome, numeroMudado, email}: Valores){
    await axios.post('https://sheetdb.io/api/v1/bo6z9p6sxriyi', {
        "data": {
            "nome": nome,
            "numero": numeroMudado,
            "email": email
        }
    }, {
        "auth": {
            "username": "ywlesyn2",
            "password": "zaf3rnvarz6a5ei61jth"
        }
    })
 }
}

export { SalvarVendas }
