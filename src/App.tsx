import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Home from "./components/Home";
import BeginJourney from "./components/BeginJourney";
import EligibilityCheck from "./components/Eligibility/EligibilityCheck";
import EligibilityFeedback from "./components/Eligibility/Feedback";
import UnderstandVotingMethod from "./components/UnderstandingVotingMethod/UnderstandVotingMethod";
import UnderstandingFeedback from "./components/UnderstandingVotingMethod/Feedback";
import FindPollingStation from "./components/FindPollingStation/FindPollingStation";
import SpecialCases from "./components/FindPollingStation/SpecialCases";
import GamifiedQuiz from "./components/FindPollingStation/GamifiedQuiz";
import SpecialCasesFeedback from "./components/FindPollingStation/Feedback";
import IdCheckList from "./components/WhatIdBring/IdCheckList";
import VotingFunFacts from "./components/FunFacts/VotingFunFacts";
import Feedback from "./components/FunFacts/Feedback";
import PageNotFound from "./components/PageNotFound";
import FinalCheckList from "./components/FinalCheckList/FinalCheckList";
import PDFCheckList from "./components/FinalCheckList/PDFCheckList";
import CompleteFeedback from "./components/FinalCheckList/Feedback";

function App() {
	return (
		<div>
			<BrowserRouter >
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/begin-journey' element={<BeginJourney/>} />
					<Route path='/eligibility-check' element={<EligibilityCheck/>} />
					<Route path='/eligibility-feedback' element={<EligibilityFeedback/>} />
					<Route path='/understand-voting-method' element={<UnderstandVotingMethod/>} />
					<Route path='/understand-feedback' element={<UnderstandingFeedback/>} />
					<Route path='/find-my-polling-station' element={<FindPollingStation/>} />
					<Route path='/polling-special-cases' element={<SpecialCases/>} />
					<Route path='/gamified-quiz' element={<GamifiedQuiz/>} />
					<Route path='/special-cases-feedback' element={<SpecialCasesFeedback/>} />
					<Route path='/id-check-list' element={<IdCheckList/>} />
					<Route path='/voting-fun-facts' element={<VotingFunFacts/>} />
					<Route path='/fun-fact-feedback' element={<Feedback/>} />
					<Route path='/final-check-list' element={<FinalCheckList/>} />
					<Route path='/complete-feedbck' element={<CompleteFeedback/>} />
					<Route path='/save-as-pdf' element={<PDFCheckList/>} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter >
		</div>
	);
}

export default App;