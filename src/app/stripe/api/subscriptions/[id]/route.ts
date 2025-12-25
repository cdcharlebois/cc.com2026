import { useParams } from "next/navigation"


export const GET = async (req: Request) => {
    const {id} = useParams()
    console.log(id);
    return Response.json({ok: true})
}