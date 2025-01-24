export const Loader = () => {
	return (
		<div className="d-flex align-items-center justify-content-center" style={{ height: '50vh', backgroundColor: '#FFF', borderRadius: '10px' }}>
			<div className="spinner-border text-warning" role="status" style={{width: '3rem', height: '3rem'}}>
				<span className="sr-only"></span>
			</div>
			<span className="sr-only text-warning p-2">Wait Loading...</span>
		</div>
	);
};