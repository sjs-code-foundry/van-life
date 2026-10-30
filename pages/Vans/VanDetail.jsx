import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getVans } from "../../api";

import Error from "../../components/Error";
import BackBtn from "../../components/navigation/BackBtn";

export default function VanDetail() {
  const params = useParams();
  const location = useLocation();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans(false, params.id);
        setDetails(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();

    return () => controller.abort();
  }, [params.id]);

  if (loading) {
    return (
      <div className="van-detail">
        <h1 aria-live="polite">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    details && (
      <div className="van-detail">
        <BackBtn state={location.state} />
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
    )
  );
}
