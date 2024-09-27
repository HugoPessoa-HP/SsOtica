import moment from 'moment';

async function updatedDate(){
    let currentDate = new Date();
    if(currentDate.getDay() == 1){
        const previousDate = await moment().subtract(3, "days").format("YYYY-MM-DD");
        return previousDate;
    } else {
        const previousDate = await moment().subtract(1, "days").format("YYYY-MM-DD");
        return previousDate;
    }
}

export default updatedDate