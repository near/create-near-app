'use client'
import './globals.css'
import '@near-wallet-selector/modal-ui/styles.css'

import { NetworkId } from '@/config'
import { Navigation } from '@/components/navigation'
import { useInitWallet } from '@/wallets/wallet-selector'
// import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  useInitWallet({ createAccessKeyFor: '', networkId: NetworkId })
  // const pathname = usePathname()
  // let before = pathname.substring(0, pathname.indexOf(`/gateway`))
  // console.log(children)
  // console.log('pathname', pathname)
  // console.log('before', before)
  // console.log('if pathname ===', `${before}/gateway`)
  // if (pathname === `${before}/gateway/hello-components`) {
  //   return (
  //     <html lang="en">
  //       <body>
  //         <h1>Welcome to {pathname}</h1>
  //         {children}
  //       </body>
  //     </html>
  //   )
  // }
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
