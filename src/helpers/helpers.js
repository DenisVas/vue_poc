export default {
    parseUserDBFiledsToFormFormat: (data) => {
        let parsedData = []
            for (let dataKey in data) {
                parsedData.push({
                    fieldName: dataKey,
                    value: data[dataKey]
                })
            }
            return parsedData;
    },
    parseUserFormFiledsToDBFormat: (data) => {
        let formatedData = {};
        for (let dataKey in data) {
            formatedData[dataKey] = data[dataKey].reduce((accomulator, currentVal) => {
                accomulator[currentVal.fieldName] = currentVal.value;
                return accomulator;
            }, {});
        }

        return formatedData;
    } 
}