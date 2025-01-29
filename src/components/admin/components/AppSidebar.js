import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler, CAvatar } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
//import logo from '/public/assets/images/canada_bear.png'
import SimpleBar from 'simplebar-react'
//import 'simplebar/dist/simplebar.min.css'
import useVotingStore from '../../../redux/store';

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
	const { sidebarShow, unfoldable } = useVotingStore();
	//const dispatch = useDispatch()
	//const unfoldable = useSelector((state) => state.sidebarUnfoldable)
	//const sidebarShow = useSelector((state) => state.sidebarShow)
	return (
		<CSidebar position="fixed" unfoldable={unfoldable} visible={sidebarShow}	>
			<CSidebarBrand className="d-none d-md-flex" to="/">
				<a href="/">
					<CAvatar src="/public/assets/images/canada_bear.png" style={{ width: '5rem', height: '3rem'}}/>
				</a>
			</CSidebarBrand>
			<CSidebarNav>
				<SimpleBar>
					<AppSidebarNav items={navigation} />
				</SimpleBar>
			</CSidebarNav>
			<CSidebarToggler className="d-none d-lg-flex"/>
		</CSidebar>
	)
}

export default React.memo(AppSidebar)
