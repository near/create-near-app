import 'App.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { isValidAttribute } from 'dompurify'
import 'error-polyfill'
import { useInitNear } from 'near-social-vm'
import React, { useEffect, useState } from 'react'
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
import Urbit from './pages/Urbit'
import Welcome from './pages/Welcome'

export const refreshAllowanceObj = {}

function App(props) {
  const { initNear } = useInitNear()

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
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

  const [redirectMap, setRedirectMap] = useState(null)

  useEffect(() => {
    const fetchRedirectMap = async () => {
      try {
        const localStorageFlags = JSON.parse(
          localStorage.getItem('flags') || '{}'
        )
        let redirectMapData

        if (localStorageFlags.bosLoaderUrl) {
          const response = await fetch(localStorageFlags.bosLoaderUrl)
          const data = await response.json()
          redirectMapData = data.components
        } else {
          console.log('sessionStorage', sessionStorage)
          redirectMapData = JSON.parse(
            sessionStorage.getItem(SESSION_STORAGE_REDIRECT_MAP_KEY) || '{}'
          )
        }
        setRedirectMap(redirectMapData)
      } catch (error) {
        console.error('Error fetching redirect map:', error)
      }
    }
    fetchRedirectMap()
  }, [])

  const passProps = {
    refreshAllowance: () => refreshAllowance(),
    redirectMap,
    widgets: Widgets
  }

  let str = window.location.pathname
  let before = str.substring(0, str.indexOf(`/gateway`))
  return (
    <Router basename={`${before}/gateway`}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home">
          <Welcome {...passProps} />
        </Route>
        <Route path="/urbit">
          <Urbit {...passProps} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
