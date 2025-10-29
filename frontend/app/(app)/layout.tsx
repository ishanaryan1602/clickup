import { ReactNode } from "react";

export default function RootLayout({ children }: {children:ReactNode}) {
    return (
        <>
            navbar for home page
            {children}
        </>
    )
}