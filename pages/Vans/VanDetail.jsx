import React from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const params = useParams();
  console.log(params);

  const [details, setDetails] = React.useState(null);
  console.log(details);

  React.useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/vans/${params.id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Van details fetch request failed.");
        }
        return res.json();
      })
      .then((data) => {
        setDetails(data.vans);
      });

    return () => controller.abort();
  }, [params.id]);

  return details ? (
    <div className="van-detail">
      <img
        src={details.imageUrl}
        alt={`Large image for the ${details.name} van.`}
      />
      <p className={`van-type ${details.type} selected`}>{details.type}</p>
      <h1>{details.name}</h1>
      <div className="van-detail-rate-box">
        <p className="van-detail-rate">{`$${details.price}`}</p>
        <p>/day</p>
      </div>
      <p className="van-detail-description">{details.description}</p>
      <button className="van-detail-btn">Rent this van</button>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
