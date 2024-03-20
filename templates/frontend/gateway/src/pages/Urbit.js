import React from 'react'
import { Widget } from 'near-social-vm'
import { Widgets } from '../data/widgets'
import newComponents from '../../build/data.json'

//  hosts locally build VM components
const header = newComponents['account.Urbit/widget/components.header']
const UrbitWidget = newComponents['account.Urbit/widget/components.UrbitWidget']

function Urbit({ redirectMap }) {
  const socialComponents = Widgets

  return (
    <div>
      <Widget src={socialComponents.UrbitHeader} config={{ redirectMap }} />
      <Widget
        code={UrbitWidget.code}
        props={{
          ship: 'zod',
          host: 'http://localhost:80',
          code: 'lidlut-tabwed-pillex-ridrup'
        }}
        config={{ redirectMap }}
      />
    </div>
  )
}

export default Urbit
