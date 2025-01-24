import React from 'react';

interface QuestionCardProps {
  question: string;
  options: string[];
  currentQuestion: number;
  totalQuestions: number;
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  options,
  currentQuestion,
  totalQuestions,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <div className="card border-0 mb-4">
		<div className="card-body p-1">
			<div className="d-flex justify-content-md-center align-items-center question-card mb-2" style={{backgroundImage: 'url(/assets/question-background.png)'}}>
				<p className="question-title p-4 h5">{question}</p>
			</div>
			<div className="p-1 text-sm-end mb-3">
				<small className="question-count text-sm-end">{currentQuestion}/{totalQuestions}</small>
			</div>		
			<div className="d-flex flex-column gap-2">
				{options.map((option, index) => (
					<div key={index} className={`question-btn ${selectedOption === option ? 'question-option-active' : 'question-option-inactive'}`} onClick={() => onOptionSelect(option)} role="button">
						<div className="d-flex justify-content-between">
							<div className={`${selectedOption === option ? 'question-no-active' : ' question-no'}`}>
								{String.fromCharCode(65 + index)}
							</div>
							<span className="question-option-text">{option}</span>
							<div className="custom-checkbox">
								<label className="checkbox-container">
									<input type="checkbox" checked={selectedOption === option ? true : false} readOnly={true}/>
									<span className="checkmark-round"></span>
								</label>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
    </div>
  );
};
