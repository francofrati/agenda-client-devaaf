export function listOfObjectsToArray(object: any) {
    return Object.entries<any>(object).map((element) => element[1])
}