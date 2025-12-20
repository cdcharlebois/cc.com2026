"use client";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Nav, Navbar } from "react-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
import { Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { IoLogoReact, IoOpenOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function RootLayout(props: LayoutProps<"/">) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body data-bs-theme="dark">
        <Navbar className="bg-body-tertiary">
          <Container style={{maxWidth: 1024}}>
            <Navbar.Brand href="/">Conner Charlebois</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="me-auto">
                <Nav.Link href="/" active={pathname === "/"}>Home</Nav.Link>
                <Nav.Link href="/stripe" active={pathname.startsWith("/stripe")}>Stripe</Nav.Link>
                <Nav.Link href="/blog" active={pathname.startsWith("/blog")}>Blog</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-4" style={{maxWidth: 1024}}>
          {/* <Row>
          <Col lg={2}></Col>
          <Col lg={8}> */}
          {props.children}
          {/* </Col>
          <Col lg={2}></Col>
          </Row> */}
        </Container>
        <Container>
          <footer>
            Made with ❤️ and <Image src="/nextjs-icon-dark-background.svg" height={20} />  in Philadelphia, PA
          </footer>
        </Container>
      </body>
    </html>
  );
}
