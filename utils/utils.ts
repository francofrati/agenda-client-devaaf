export function listOfObjectsToArray(object: any) {
    return Object.entries<any>(object)
}

export function listOfObjectsToObjectKeysArray(object: any) {
    return Object.keys(object)
}


export function numberToCurrency(number: number) {
    const formatter = new Intl.NumberFormat('es-ar', {
        style: 'currency',
        currency: 'ARG',
    })

    return formatter.format(number)
}