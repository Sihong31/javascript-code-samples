const React = require('react');

function Button(props) {
	return (
		<a href={props.link} className={`hidden-xs btn cure-btn ${props.extraClass}`} id={props.id} role="button">
			<div className="btn-text-container">
				{props.bodyText}
			</div>
		</a>
	);
}

export default Button;