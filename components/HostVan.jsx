import { Link } from "react-router-dom";

export default function HostVan(props) {
  return (
    <div className="host-van">
      <img
        src={props.imgUrl}
        alt={`Image of van ${props.id}, called ${props.name}.`}
      />
      <div className="host-van-name-area">
        <p>{props.name}</p>
        <p className="host-van-name-area-rate">${props.rate}/day</p>
      </div>
    </div>
  );
}
