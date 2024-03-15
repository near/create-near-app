import { Widget } from 'near-social-vm'
import React, { useMemo } from 'react'
import newComponents from '../../build/data.json'
import { useLocation } from 'react-router-dom'

//  hosts locally build VM components
const header = newComponents['account.Urbit/widget/components.Header']
const helloUrbit = newComponents['account.Urbit/widget/components.helloUrbit']

function Viewer({ redirectMap }) {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value
      return props
    }, {})
  }, [location])

  return (
    <div>
      <Widget code={header.code} props={passProps} config={{ redirectMap }} />
      <Widget
        code={helloUrbit.code}
        props={passProps}
        config={{ redirectMap }}
      />
      <Widget
        src={'lonhep-tamfeb.testnet/widget/TestUrbitComponent'}
        props={passProps}
        config={{ redirectMap }}
      />
    </div>
  )
}

export default Viewer
