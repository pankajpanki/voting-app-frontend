import React from "react"
import Header from './layouts/Header'
import Sidebar from './layouts/Sidebar'
//import { CChartLine,CChart } from '@coreui/react-chartjs'
//import { getStyle, hexToRgba } from '@coreui/utils'
//import CIcon from '@coreui/icons-react'
//import { cilPeople, cilDollar, cilTags } from '@coreui/icons'
//import 'react-toastify/dist/ReactToastify.css'; // import first
//import { ToastContainer, toast } from 'react-toastify'; // then this
//import { makeRequest } from 'src/_helpers'

const Dashboard = () => {

  return (
    <div className="">
		
		<Sidebar />
      <div className="mcw">
		  <div className="cv">
			<div>
			 <div className="inbox">
			   <div className="inbox-sb">
				 
			   </div>
			   <div className="inbox-bx container-fluid">
				 <div className="row">
				   <div className="col-md-2">
					 <ul>
					   <li><a href="#">Inbox</a></li>
					   <li><a href="#">Sent</a></li>
					   <li><a href="#">Trash</a></li>
					 </ul>
				   </div>
				   <div className="col-md-10">
					 <table className="table table-stripped">
					   <tbody>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star"></i></td>
						   <td><b>Mozilla</b></td>
						   <td><b>In celebration of women and girls everywhere</b></td>
						   <td></td>
						   <td>Mar 10</td>
						 </tr>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star-o"></i></td>
						   <td>Dan Glenn</td>
						   <td>[ptcuser-announcements] - PTC/USER Expert Speaker Series Webinar March 9, 2017 11AM (EST)</td>
						   <td><i className="fa fa-paperclip"></i></td>
						   <td>Mar 10</td>
						 </tr>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star-o"></i></td>
						   <td>Jetpack</td>
						   <td>Announcing some highly requested improvements and our new affiliate program</td>
						   <td></td>
						   <td>Mar 08</td>
						 </tr>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star-o"></i></td>
						   <td>Jetpack</td>
						   <td>Announcing some highly requested improvements and our new affiliate program</td>
						   <td></td>
						   <td>Mar 08</td>
						 </tr>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star-o"></i></td>
						   <td>Jetpack</td>
						   <td>Announcing some highly requested improvements and our new affiliate program</td>
						   <td></td>
						   <td>Mar 08</td>
						 </tr>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star-o"></i></td>
						   <td>Jetpack</td>
						   <td>Announcing some highly requested improvements and our new affiliate program</td>
						   <td></td>
						   <td>Mar 08</td>
						 </tr>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star-o"></i></td>
						   <td>Jetpack</td>
						   <td>Announcing some highly requested improvements and our new affiliate program</td>
						   <td></td>
						   <td>Mar 08</td>
						 </tr>
						 <tr>
						   <td><input type="checkbox"/></td>
						   <td><i className="fa fa-star-o"></i></td>
						   <td>Jetpack</td>
						   <td>Announcing some highly requested improvements and our new affiliate program</td>
						   <td></td>
						   <td>Mar 08</td>
						 </tr>
					   </tbody>
					 </table>
				   </div>
				 </div>
			   </div>
			 </div>
			</div>
		  </div>
		</div>
    </div>
  )
}

export default Dashboard
