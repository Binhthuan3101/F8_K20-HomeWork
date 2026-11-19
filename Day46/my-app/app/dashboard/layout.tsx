import Link from 'next/link'
import React, { ReactNode } from 'react'
import NavBar from '../ui/NavBar'

export default function layout({children}:{children: ReactNode}) {
  return (
      <div>
          <NavBar/>
          <div>
              {children}
          </div>
    </div>
  )
}
