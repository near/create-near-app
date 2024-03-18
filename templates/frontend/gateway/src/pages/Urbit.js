import { Widget } from 'near-social-vm'
import React from 'react'
import newComponents from '../../build/data.json'

//  hosts locally build VM components
const header = newComponents['account.Urbit/widget/components.header']
const helloUrbit = newComponents['account.Urbit/widget/components.helloUrbit']

function Urbit({ redirectMap }) {
  return (
    <div>
      <Widget code={header.code} config={{ redirectMap }} />
      <Widget code={helloUrbit.code} config={{ redirectMap }} />
    </div>
  )
}

export default Urbit
