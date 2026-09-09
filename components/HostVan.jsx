import { Link } from "react-router-dom";

export default function HostVan(props) {
  return (
    <div className="host-van">
      <Link
        to={`/host/vans/${props.id}`}
        aria-label={`View host-specific details for ${props.name}, priced at ${props.rate} per day.`}
      >
        <img
          src={props.imgUrl}
          alt={`Image of van ${props.id}, called ${props.name}.`}
        />
        <div className="host-van-name-area">
          <p>{props.name}</p>
          <p className="host-van-name-area-rate">${props.rate}/day</p>
        </div>
      </Link>
    </div>
  );
}
