export const GET = async (
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params
    console.log(id);
    return Response.json({ ok: true })
}