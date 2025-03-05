import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
    return (
        <>
            <div className="container w-screen h-screen  mx-auto px-4 py-12 text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Sahifa Topilmadi</h1>
                <p className="text-muted-foreground mb-6">
                    Kechirasiz, siz qidirayotgan sahifa mavjud emas
                </p>
                <Button asChild>
                    <Link href="/">Bosh Sahifaga Qaytish</Link>
                </Button>
            </div>
        </>
    )
}

export default NotFound
