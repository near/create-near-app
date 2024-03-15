import React from 'react'
import { Link } from 'react-router-dom'
import { Widget } from 'near-social-vm'
import { Widgets } from '../data/widgets'

function Welcome({ redirectMap, signedIn, signedAccountId }) {
  const socialComponents = Widgets

  return (
    <div>
      <Widget
        src={socialComponents.Greeter}
        props={signedIn ? { name: signedAccountId } : { name: 'User' }}
        config={{ redirectMap }}
      />
      <Link to="/urbit">Urbit Widget</Link>
    </div>
  )
}
export default Welcome
