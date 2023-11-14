import { database } from "./config";
import { get, ref, child, query, startAt, Query, orderByKey } from 'firebase/database'

const databaseRef = ref(database)

export async function readData(path: string) {

    try {
        const snapshot = await get(child(databaseRef, path))

        if (snapshot.exists()) {
            return snapshot.val()
        }
        return undefined

    } catch (error) {
        console.log(error)
        return undefined
    }
}

export async function readDataWithStartAt(path: string, startAtValue: string | number | boolean | null | undefined) {
    try {
        const queryRef = query(ref(database, path), orderByKey(), startAt(startAtValue))
        const snapshot = await get(queryRef)

        if (snapshot.exists()) {
            return snapshot.val()
        }
        return undefined

    } catch (error) {
        console.log(error)
        return undefined
    }
}
