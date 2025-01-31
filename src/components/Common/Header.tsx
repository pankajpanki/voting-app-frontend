import { useNavigate} from "react-router-dom";
import { ArrowLeft, CircleAlert } from 'lucide-react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { ProgresWizard } from './ProgresWizard';
import parse from 'html-react-parser';

interface HeaderProps {
	showprogress: boolean;
	total_steps: number;
	current_step: number;
	title: string;
	subtitle?: string;
	disclaimer?: string;
}

export const Header: React.FC<HeaderProps> = ({ showprogress, total_steps, current_step, title, subtitle = "", disclaimer="" }) => {
	let navigate = useNavigate();
	return (
		<div className="">
			<div className="progress-bar">
			{showprogress ? <ProgresWizard totalSteps={total_steps} currentStep={current_step} /> : null}
			</div>
			<div className="mb-2">
				<div className="row mt-3 mb-3">
				  <div className="d-flex justify-content-between align-items-center w-100">
					<span role="button" onClick={() => navigate(-1)} className="">
						<ArrowLeft color="white" size={24} />
					</span>
					{title && (
						<h4 className="main-steps-title mb-0 text-center w-100">{parse(String(title))}
							{disclaimer && (
								<OverlayTrigger
									placement="bottom"
									delay={{ hide: 450, show: 300 }}
									overlay={(props) => (
										<Tooltip {...props} className="header-tooltip">
												{disclaimer}
										</Tooltip>
									)}
								>
									<CircleAlert size={20} className="ms-1"/>
								</OverlayTrigger>
							)}
						</h4>
					)}
				  </div>
				</div>
				<div className="text-center">
					{subtitle && <p className="text-center main-steps-sub-title mt-3 mb-3">{parse(String(subtitle))}</p>}
				</div>
			</div>
		</div>
	);
};