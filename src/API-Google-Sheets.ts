import axios from 'axios';

interface Values{
    name: String,
    number: String,
    email: String,
}

class SalesSave{
    async salesSave({name, number, email}: Values){
    await axios.post('https://sheetdb.io/api/v1/exemplo', {
        "data": {
            "nome": name,
            "numero": number,
            "email": email
        }
    }, {
        "auth": {
            "username": "username",
            "password": "password"
        }
    })
 }
}

export { SalesSave }
