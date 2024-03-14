import { setupWalletSelector } from '@near-wallet-selector/core'
import { setupHereWallet } from '@near-wallet-selector/here-wallet'
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet'
import { setupModal } from '@near-wallet-selector/modal-ui'
import '@near-wallet-selector/modal-ui/styles.css'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import { setupNearWallet } from '@near-wallet-selector/near-wallet'
import { setupNeth } from '@near-wallet-selector/neth'
import { setupSender } from '@near-wallet-selector/sender'
import 'App.scss'
import Big from 'big.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { isValidAttribute } from 'dompurify'
import 'error-polyfill'
import { useAccount, useInitNear, useNear, utils } from 'near-social-vm'
import React, { useCallback, useEffect, useState, Suspense } from 'react'
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import {
  Link,
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import { NetworkId, Widgets } from './data/widgets'
import Viewer from './pages/Viewer'
import Core from './components/Core'

export const refreshAllowanceObj = {}
const documentationHref = 'https://social.near-docs.io/'

function App(props) {
  const [connected, setConnected] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [signedAccountId, setSignedAccountId] = useState(null)
  const [availableStorage, setAvailableStorage] = useState(null)
  const [walletModal, setWalletModal] = useState(null)
  const [widgetSrc, setWidgetSrc] = useState(null)

  const { initNear } = useInitNear()
  const near = useNear()
  const account = useAccount()
  const accountId = account.accountId

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
        selector: setupWalletSelector({
          network: NetworkId,
          modules: [
            setupNearWallet(),
            setupMyNearWallet(),
            setupSender(),
            setupHereWallet(),
            setupMeteorWallet(),
            setupNeth({
              gas: '300000000000000',
              bundle: false
            })
          ]
        }),
        customElements: {
          Link: (props) => {
            if (!props.to && props.href) {
              props.to = props.href
              delete props.href
            }
            if (props.to) {
              props.to =
                typeof props.to === 'string' &&
                isValidAttribute('a', 'href', props.to)
                  ? props.to
                  : 'about:blank'
            }
            return <Link {...props} />
          }
        },
        config: {
          defaultFinality: undefined
        }
      })
  }, [initNear])

  useEffect(() => {
    if (!near) {
      return
    }
    near.selector.then((selector) => {
      setWalletModal(
        setupModal(selector, { contractId: near.config.contractName })
      )
    })
  }, [near])

  const requestSignIn = useCallback(
    (e) => {
      e && e.preventDefault()
      walletModal.show()
      return false
    },
    [walletModal]
  )

  const logOut = useCallback(async () => {
    if (!near) {
      return
    }
    const wallet = await (await near.selector).wallet()
    wallet.signOut()
    near.accountId = null
    setSignedIn(false)
    setSignedAccountId(null)
  }, [near])

  const refreshAllowance = useCallback(async () => {
    alert(
      "You're out of access key allowance. Need sign in again to refresh it"
    )
    await logOut()
    requestSignIn()
  }, [logOut, requestSignIn])
  refreshAllowanceObj.refreshAllowance = refreshAllowance

  useEffect(() => {
    if (!near) {
      return
    }
    setSignedIn(!!accountId)
    setSignedAccountId(accountId)
    setConnected(true)
  }, [near, accountId])

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance
        ? Big(account.storageBalance.available).div(utils.StorageCostPerByte)
        : Big(0)
    )
  }, [account])
  //)

  const passProps = {
    refreshAllowance: () => refreshAllowance(),
    setWidgetSrc,
    signedAccountId,
    signedIn,
    connected,
    availableStorage,
    widgetSrc,
    logOut,
    requestSignIn,
    widgets: Widgets,
    documentationHref
  }
  let str = window.location.pathname
  let before = str.substring(0, str.indexOf(`/gateway`))
  console.log(`${before}/gateway`)
  console.log(window.location)
  return (
    <Router basename={`${before}/gateway`}>
      {/* <Suspense fallback={<div>Loading...</div>}></Suspense> */}
      <Switch>
        <Route path="/urbit">
          <Viewer {...passProps} />
          <Core {...passProps} />
        </Route>
        {/* <Route path={'/new'}>
          <div>
            <h1>page at /new path</h1>
          </div>
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
