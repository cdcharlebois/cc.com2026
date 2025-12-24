interface IPostParams {
    url: string,
    body: string
}
export const post = async ({url, body}: IPostParams) => {
    const res = await fetch(url, {
        method: "POST",
        body,
        headers: {
            "Content-Type": "Application/json"
        }
    })
    return await res.json();
}