import { Link } from "react-router-dom";

export default function Van(props) {
  return (
    <div className="van">
      <Link to={`/vans/${props.id}`}>
        <img className="van-img" src={props.imgUrl} />
        <div className="van-name-box">
          <p className="van-name">{props.name}</p>
          <p className="van-rate">${props.rate}</p>
        </div>
        <p className="van-rate-unit">/day</p>
        <div className="van-type-container">
          <p className={`van-type ${props.type} selected`}>{props.type}</p>
        </div>
      </Link>
    </div>
  );
}
