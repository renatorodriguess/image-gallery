import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Gallery',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <Head>
      <link rel="icon" href="/logo.jpg" sizes="any" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

