import { Link, useNavigate} from "react-router-dom";
import { LogOut } from 'lucide-react';

const Header = () => {
	let navigate = useNavigate();
	const handleLogout = () => {
		localStorage.clear();
		window.location.href = '/admin/login'
	}
	return (
		<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
			<Link className="navbar-brand d-flex justify-content-center align-items-center col-sm-3 col-md-2 mr-0 border-end" to="/">
				<span className="text-center">Canada Election</span>
			</Link>
			{/*<input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />*/}
			<ul className="navbar-nav px-3">
				<li className="nav-item text-nowrap pointer" role="button">
					<span className="nav-link text-white" onClick={() => handleLogout()}><LogOut /> <span className="ms-1">Sign out</span></span>
				</li>
			</ul>
		</nav>
	);
};

export default Header;