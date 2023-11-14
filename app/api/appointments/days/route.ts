import { getAvailableAppointmentsByDayByBusinessId, getAvailableDaysByBusinessId } from "@/lib/appointments/services"

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url)
        const businessId = searchParams.get('ref')
        const day = searchParams.get('d')

        if (!businessId) throw Error('No ref')
        if (!day) throw Error('No day')

        const availableDays = await getAvailableDaysByBusinessId(businessId, day)

        return Response.json(availableDays)

    } catch (error: any) {

        return Response.json(error.message)
    }
}