    async function checkNumber(number: JSON){
        if(number !== undefined){
            var numberChanged = await JSON.stringify(number);
            var firstNumber = numberChanged[0];
            var finalNumber = numberChanged.replace(/\D/g, '');
            return finalNumber;
        } else {
            var numberChanged = await JSON.stringify(number)
            var finalNumber = "Não informou Número"
            return finalNumber;
        }
    }

export default { checkNumber }