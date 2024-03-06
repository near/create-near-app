import dynamic from 'next/dynamic'

import styles from '@/app/app.module.css'
import { NetworkId, ComponentMap } from '@/config'
import newComponents from '../../../build/hello-near/data.json'

const urbitComponent =
  newComponents['account.Urbit/widget/components.urbitComponent']
const urbitComponentCode = urbitComponent.code

const Component = dynamic(() => import('@/components/vm-component'), {
  ssr: false
})

const socialComponents = ComponentMap[NetworkId]

export default function HelloComponents() {
  return (
    <>
      <main className={styles.main}>
        <div className="col-6">
          <Component code={urbitComponentCode} />
          <Component src={socialComponents.Greeter} props={{ name: 'Anna' }} />
        </div>
        <hr />
      </main>
    </>
  )
}
