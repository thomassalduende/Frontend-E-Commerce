import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { NavBar } from '@/components/admin/NavBar'
import { Providers } from '@/context/Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'BookShop',
    description: 'by Buasys',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <NavBar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
