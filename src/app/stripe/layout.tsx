"use client"
import { usePathname, useRouter } from "next/navigation";
import { Button, Nav, Navbar } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";

export default function StripeLayout(props: LayoutProps<"/stripe">) {
    const pathname = usePathname();
    const router = useRouter();
    return <>
        {/* <Navbar className="bg-body-secondary">
            <Nav className="me-auto">
                <Nav.Link href="/stripe/pricing-table" active={pathname.startsWith("/stripe/pricing-table")}>Pricing Table</Nav.Link>
            </Nav>
        </Navbar> */}
        <div className="mt-4">
            {pathname != "/stripe" && <Button variant="link" onClick={router.back}><IoArrowBack />Back</Button>}
            {props.children}
        </div>
        

    </>

}