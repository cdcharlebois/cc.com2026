"use client"

import { IBlogHeader } from "@/app/api/v1/blog/getPosts/route";
import BlogHeader from "@/components/BlogHeader";
import Link from "next/link";
import { useEffect, useState } from "react"
import { Card, Placeholder, Row, Spinner, Stack } from "react-bootstrap";
import { IoOpenOutline } from "react-icons/io5";



export default () => {
    const [items, setItems] = useState<IBlogHeader[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/v1/blog/getPosts");
                const data = await res.json();
                setItems(data.posts);
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        })()
    }, [])
    return <>
        <h1>Blog</h1>
        <p>I write on medium.com. You can visit my page <Link href="https://medium.com/@connercharlebois">here <IoOpenOutline /></Link> or check out any of the specific posts below.</p>
        {loading ? <Spinner /> : 
        (<Row>
            {items.map((post, i) => <BlogHeader key={i} post={post} />)}
        </Row>)}
        
    </>
}