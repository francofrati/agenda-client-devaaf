import { database } from "./config";
import { get, ref, child, Query } from 'firebase/database'

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

