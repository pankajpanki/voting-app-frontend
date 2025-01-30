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
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main className="col-md-10 ml-sm-auto col-lg-10 px-4 mt-5" style={{ marginLeft: '320px' }}>
						<div className="text center" style={{ marginTop: '320px' }}>
							<h1 className="text center">Welcom To Election Canada</h1>
						</div>
					</main>
				</div>
			</div>
		</>	
	)
}

export default Dashboard
