'use client'
import dynamic from 'next/dynamic'
import path from 'path'
import { usePathname } from 'next/navigation'
import styles from '@/app/app.module.css'
import { NetworkId, ComponentMap } from '@/config'
import pJson from '@pjson'
// const newNamePath = '@build/' + pJson.name + '/data.json'
import newComponents from '@build/hello-near/data.json'

//console.log('path', path.join('@build/', pJson.name, '/data.json'))

//`@build/hello-near/data.json`  //'../../../../build/hello-near/data.json'

const helloUrbit = newComponents['account.Urbit/widget/components.helloUrbit']

const helloUrbitCode = helloUrbit.code

const Component = dynamic(() => import('@/components/vm-component'), {
  ssr: false
})
const socialComponents = ComponentMap[NetworkId]

export default function HelloComponents() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <>
      <main className={styles.main}>
        <div className="col-6">
          <Component code={helloUrbitCode} />
          <Component src={socialComponents.Greeter} props={{ name: 'Anna' }} />
        </div>
        <hr />
      </main>
    </>
  )
}
