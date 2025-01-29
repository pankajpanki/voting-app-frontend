import React,{useState,useEffect} from 'react';
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate } from 'react-router-dom';
//import avatar8 from './../../assets/images/avatars/8.jpg';
import DummyImage from 'src/assets/images/user_dummy.jpg'
import { useSelector } from 'react-redux';

const AppHeaderDropdown = () => {
	const navigate = useNavigate();
	const renderHeader = useSelector(s=>s.renderHeader);
	const [user, setUser] = useState({});

	useEffect(() => {
		getUserDetail()
	}, [renderHeader]);

	function handleLogout() {
		localStorage.clear();
		navigate("/login");
	}

	const getUserDetail = () => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			setUser(user)
		}
	}

	return (
		<CDropdown variant="nav-item">
			<CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
				<CAvatar src={DummyImage} size="md" />Hi {Object.keys(user).length === 0 ? 'No Name' : user.name}
			</CDropdownToggle>
			<CDropdownMenu className="pt-0" placement="bottom-end">
				<CDropdownItem style={{cursor: 'pointer'}} href={undefined} onClick={handleLogout}>
					<CIcon icon={cilLockLocked} className="me-2" />
					Log Out
				</CDropdownItem>
			</CDropdownMenu>
		</CDropdown>
	)
}

export default AppHeaderDropdown
