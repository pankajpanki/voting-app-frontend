import React from 'react';

interface ModuleItemProps {
	imgSrc: string;
	title: string;
}

export const ModuleItem: React.FC<ModuleItemProps> = ({ imgSrc, title }) => {
	
	return (
		<div className="d-flex align-items-center bg-white rounded-3 p-4 mb-3" role="button">
			<div className="d-flex align-items-center justify-content-center begin-card-image me-3">
				<img src={imgSrc} alt="icon" />
			</div>
			<p className="begin-card-title ms-4">{title}</p>
		</div>
	);
};

