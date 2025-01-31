import { Link, useNavigate, useLocation } from "react-router-dom";
import { FilePenLine, House } from 'lucide-react';

const Sidebar = () => {
	let navigate = useNavigate();
	const location = useLocation();
	
	return (
		<nav className="col-md-2 d-none d-md-block bg-light sidebar">
			<div className="sidebar-sticky">
				<ul className="nav nav-pills flex-column">
					<li className="nav-item">
						<Link className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`} to="/admin/dashboard">
							<House size={20} />
							<span className="ms-1">Dashboard </span>
						</Link>
					</li>
					<li className="nav-item">
						<Link className={`nav-link ${location.pathname === '/admin/update-home-page-data' ? 'active' : ''}`} to="/admin/update-home-page-data">
							<FilePenLine size={20} />
							<span className="ms-1">Update Home Page Data</span>
						</Link>
					</li>
					{/*<li className="nav-item">
						<Link className={`nav-link ${location.pathname === '/admin/update-begin-journey-data' ? 'active' : ''}`} to="/admin/update-begin-journey-data">
							<FilePenLine size={20} />
							<span className="ms-1">Update Begin Journey Data</span>
						</Link>
					</li>*/}
				</ul>
			</div>
        </nav>
	);
};

export default Sidebar;