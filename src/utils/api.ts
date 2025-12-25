interface IPostParams {
    url: string,
    body: string
}
interface IGetParams {
    url: string
}
export const post = async ({ url, body }: IPostParams) => {
    const res = await fetch(url, {
        method: "POST",
        body,
        headers: {
            "Content-Type": "Application/json"
        }
    })
    return await res.json();
}
export const get = async ({ url }: IGetParams) => {
    const res = await fetch (url);
    return await res.json();
}