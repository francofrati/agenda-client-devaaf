import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebase/config"

export const signInWithEmail = async (email: string, password: string) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)

        if (res.user) {

        }

    } catch (error) {
        console.log(error)
    }
}

export const signOutFromFirebase = () => {
    signOut(auth)
}