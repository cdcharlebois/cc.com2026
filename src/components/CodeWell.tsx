import { ReactNode } from "react"
import { Alert, Badge } from "react-bootstrap"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ICodeWellProps {
    language: string,
    code: string,
    location: "client" | "server",
    title: string,
    children: ReactNode
}
export default (props: ICodeWellProps) => <Alert variant={props.location === "server" ? "success" : "info"}>
    <h2>{props.title}</h2>
    {props.children}
    <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 6, right: 6 }}>
            <Badge className="mx-1" bg={props.location === "server" ? "success" : "info"}>{props.location}</Badge>
            <Badge >{props.language}</Badge>
        </div>

        <SyntaxHighlighter language={props.language} style={oneDark}>
            {props.code}
        </SyntaxHighlighter>
    </div>


</Alert>