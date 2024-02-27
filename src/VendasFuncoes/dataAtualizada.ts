import moment from 'moment';    

async function dataAtualizada(){
    let dataAtual = new Date();
    if(dataAtual.getDay() == 1){
        const dataAnterior = await moment().subtract(3, "days").format("YYYY-MM-DD");
        return dataAnterior;
    } else {
        const dataAnterior = await moment().subtract(1, "days").format("YYYY-MM-DD");
        return dataAnterior;
    }
}

export default dataAtualizada

