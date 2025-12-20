
import { Image, Ratio } from "react-bootstrap";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div style={{ flexDirection: "row", alignItems: "center", display: "flex", marginBottom: 12 }}>
        <div style={{ width: "9vmin", marginRight: "2vmin" }}>
          <Ratio aspectRatio="1x1">
            <div style={{ overflow: "hidden", borderRadius: 999 }}>
              <Image src="/connercharlebois_bw2.jpg" alt="it me" width={"100%"} />
            </div>
          </Ratio>
        </div>
        <h1 style={{margin:0}}>Hello, there!</h1>
      </div>




      <p>I'm Conner Charlebois and I'm an integration engineer with Stripe.
        I help our most ambitious users integrate Stripe into their existing
        technology landscapes to drive better conversion and a more seamless
        customer experience.
      </p>
      <p>I have over a decade of experience delivering enterprise software
        solutions across many different industries including healthcare,
        logistics, aerospace and defense and, most recently, payments.
      </p>
    </>
  );
}
