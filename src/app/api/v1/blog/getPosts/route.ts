import Parser from "rss-parser";

export interface IBlogHeader {
    title: string,
    lede: string,
    url: string,
    date: number,
    imageUrl: string | null
}
const parser = new Parser();
/**
 * Fetch XML Feed from Medium and return blog list
 */
export const GET = async () => {
    try {
        const res = await fetch("https://medium.com/feed/@connercharlebois")
        const data = await res.text();
        // console.log(await res.text())
        // return Response.json({ok: true})
        const feed = await parser.parseString(data)
        return Response.json({
            posts: feed.items.map(post => ({
                title: post.title,
                lede: post.contentSnippet,
                url: post.link,
                date: new Date(post.pubDate ?? new Date()).getTime(),
                imageUrl: post["content:encoded"].match(/<img.+?src=\"(.+?)\".+?\/>/)[1]
            } as IBlogHeader))
        })
    } catch (e) {
        console.log(e)
        return Response.json({ error: e }, { status: 500 })
    }


}