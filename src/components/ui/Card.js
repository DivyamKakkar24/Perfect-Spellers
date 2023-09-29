import Style from './Card.css';

const Card = props => {
	return (
		<div className = "card" style={{backgroundColor: props.colour}}>
			{props.children}
		</div>
	)
};

export default Card;