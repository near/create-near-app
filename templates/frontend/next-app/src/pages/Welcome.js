import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const SESSION_STORAGE_REDIRECT_MAP_KEY = 'nearSocialVMredirectMap'

function Welcome() {
  console.log('welcome')
  return (
    <div>
      <h1>Welcome page:</h1>
      <Link to="/urbit">Urbit-component</Link>
    </div>
  )
}
export default Welcome
