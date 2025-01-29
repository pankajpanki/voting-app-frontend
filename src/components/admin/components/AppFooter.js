import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <button type="button" className="btn btn-link" rel="noopener noreferrer">
          21D
        </button>
        <span className="ms-1">&copy; 2022 </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
