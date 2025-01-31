import React from 'react';
import parse from 'html-react-parser';

interface ModuleItemProps {
	imgSrc: string | undefined;
	title: string | undefined;
}

export const ModuleItem: React.FC<ModuleItemProps> = ({ imgSrc, title }) => {
	
	return (
		<div className="d-flex align-items-center bg-white rounded-3 p-4 mb-3" role="button">
			<div className="d-flex align-items-center justify-content-center begin-card-image me-3">
				<img src={imgSrc} alt="icon" />
			</div>
			<p className="begin-card-title ms-4">{parse(String(title))}</p>
		</div>
	);
};

