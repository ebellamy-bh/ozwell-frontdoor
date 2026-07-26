import type { Metadata } from 'next'
import { Lato, Bricolage_Grotesque } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import RevealObserver from '@/components/ui/RevealObserver'
import './globals.css'

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

/**
 * Display face for headlines. The site ran on Lato alone, so a 144px hero headline was the same
 * voice as a caption — technically fine, and completely anonymous. Bricolage Grotesque is a
 * variable grotesque with enough character to carry display sizes while staying legible, and it
 * sits comfortably next to Lato's humanist body text.
 *
 * This is the most visible single change in the design pass and the easiest to reverse: swap the
 * import and `--font-heading` in globals.css follows.
 */
const bricolage = Bricolage_Grotesque({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ozwell.ai'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${bricolage.variable}`}>
      <body>
        <RevealObserver />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
