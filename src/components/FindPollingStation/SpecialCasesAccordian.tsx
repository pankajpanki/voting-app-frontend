import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import parse from 'html-react-parser';

interface SpecialCasesAccordianProps {
	showcheckbox: boolean;
	specialCases: PollingOptionFaqType[];
	selectedoptions: string[];
	setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

interface PollingOptionFaqType {
	id: string;
	title: string;
	content: string;
}

function SpecialCasesAccordian({
	showcheckbox,
	specialCases,
	selectedoptions,
	setSelectedOptions,
}: SpecialCasesAccordianProps) {
  const [openSection, setOpenSection] = useState<string | null>(''); 
	
	const toggleSection = (id: string) => {
		setOpenSection(openSection === id ? null : id);
	};
	
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let selectedoptions_array = [...selectedoptions];
		if (event.target.checked) {
			selectedoptions_array = [...selectedoptions, event.target.value];
		} else {
			selectedoptions_array = selectedoptions_array.filter(
				(option) => option !== event.target.value
			);
		}
		setSelectedOptions(selectedoptions_array);
	};
	
	return (
		<div className="accordion">
			{specialCases.map((item, index) => (
				<div key={item.id} className={`${specialCases.length > index + 1 ? "border-bottom" : ""}`}>
					<div className="w-100 d-flex align-items-center justify-content-between p-3">
						<div className="d-flex align-items-center">
							{showcheckbox ? (
								<div className="custom-checkbox">
									<label className="checkbox-container">
										<input type="checkbox" name={item.id} value={item.id}	checked={selectedoptions.includes(item.id)} onChange={(e) => handleCheckboxChange(e)} />
										<span className="checkmark-square"></span>
									</label>
								</div>
							) : (
								null
							)}
							<span className={`sc-tab-title ${showcheckbox ? 'ms-3' : ''}`}>{item.title}</span>
						</div>
						<span role="button" onClick={() => toggleSection(item.id)}>
							{openSection === item.id ? <Minus size={20} /> : <Plus size={20} />}
						</span>
					</div>
					<div className="accordion-content" id={item.id} style={{ maxHeight: openSection === item.id ? `${document.getElementById(item.id)?.scrollHeight}px` : '0px', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
						<div className="p-3 accordian-content-body">{parse(item.content)}</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default SpecialCasesAccordian;