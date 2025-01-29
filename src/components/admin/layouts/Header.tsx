import { useNavigate} from "react-router-dom";

const Header = () => {
	let navigate = useNavigate();
	return (
		<nav className="mnb navbar navbar-default navbar-fixed-top">
		  <div className="container-fluid">
			<div className="navbar-header">
			  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span className="sr-only">Toggle navigation</span>
				<i className="ic fa fa-bars"></i>
			  </button>
			  <div style={{ padding: '15px 0'}}>
				 <a href="#" id="msbo"><i className="ic fa fa-bars"></i></a>
			  </div>
			</div>
			<div id="navbar" className="navbar-collapse collapse">
			  <ul className="nav navbar-nav navbar-right">
				<li><a href="#">En</a></li>
				<li className="dropdown">
				  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Draude Oba <span className="caret"></span></a>
				  <ul className="dropdown-menu">
					<li><a href="#">Settings</a></li>
					<li><a href="#">Upgrade</a></li>
					<li><a href="#">Help</a></li>
					<li role="separator" className="divider"></li>
					<li><a href="#">Logout</a></li>
				  </ul>
				</li>
				<li><a href="#"><i className="fa fa-bell-o"></i></a></li>
				<li><a href="#"><i className="fa fa-comment-o"></i></a></li>
			  </ul>
			</div>
		  </div>
		</nav>
	);
};

export default Header;