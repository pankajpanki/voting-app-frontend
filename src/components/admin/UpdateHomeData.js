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

const UpdateHomeData = () => {

	return (
		<>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<Sidebar />
					<main className="col-md-9 ml-sm-auto col-lg-10 px-4 mt-5">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Welcome</h1>
						  </div>
					</main>
				</div>
			</div>
		</>	
	)
}

export default UpdateHomeData
