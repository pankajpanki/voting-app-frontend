import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilSpeedometer, cilPeople, cilList, cilJustifyLeft} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
//import messages from './_helpers/messages'

const _nav = [
	{component: CNavItem, name: 'Dashboard', to: '/admin/dashboard', icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />},
	{component: CNavItem, name: 'Home Page Managment', to: '/admin/home-page', icon: <i className='fa fa-tasks fa-xl nav-icon' style={{fontSize: '24px'}}></i>},
]

export default _nav
