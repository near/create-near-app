import { Widget } from 'near-social-vm'
import React, { useEffect, useMemo, useState } from 'react'
import newComponents from '../../build/data.json'
import { useLocation, useParams } from 'react-router-dom'

const header = newComponents['account.Urbit/widget/components.Header']
const helloUrbit = newComponents['account.Urbit/widget/components.helloUrbit']
const SESSION_STORAGE_REDIRECT_MAP_KEY = 'nearSocialVMredirectMap'

function Viewer({ code }) {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value
      return props
    }, {})
  }, [location])

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

  return (
    <div>
      <Widget code={header.code} props={passProps} config={{ redirectMap }} />
      <Widget
        //src={!code && src}
        code={helloUrbit.code} // prioritize code
        props={passProps}
        config={{ redirectMap }}
      />
    </div>
  )
}

export default Viewer
