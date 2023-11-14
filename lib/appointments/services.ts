import { listOfObjectsToArray } from "@/utils/utils"
import { readData, readDataWithStartAt } from "../firebase/realtimeDatabase"


export async function setAppointment(appointmentObj: any) {
    const { } = appointmentObj
    //Validate all fields

    //Create appointment for business

    //Create appointment for user

    //Give a response to the front end

    //Mail to user and business
}

export async function getAvailableAppointmentsByDayByBusinessId(businessId: string, day: number) {

    const dayAppointments = await readDataWithStartAt(`/calendar/${businessId}`, day)


    if (!dayAppointments) return []
    else return listOfObjectsToArray(dayAppointments)


}

export async function getAvailableDaysByBusinessId(businessId: string, day: string) {

    //This should returns all available days after the day given, including the day given if it's free
    const days = await readDataWithStartAt(`/calendar/${businessId}`, day)
    if (!days) return []
    else return Object.entries(days).map(array => {
        return {
            [array[0]]: Object.entries(array[1] as any).map(hourArray => {
                return {
                    [hourArray[0]]: hourArray[1]
                }
            })
        }
    })
}

export async function getBusyAppointmentsByDayByBusinessId(businessId: string, day: number) {

    const dayAppointments = await readData(`/appointments/businesses/${businessId}/${day}`)

    if (!dayAppointments) return []
    else return listOfObjectsToArray(dayAppointments)
}