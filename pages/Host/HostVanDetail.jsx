import { useState, useEffect } from "react";
import { Routes, Route, NavLink, useParams } from "react-router-dom";

import { getVans } from "../../api";

import Error from "../../components/Error";
import BackBtn from "../../components/navigation/BackBtn";

export default function HostVanDetail() {
  const params = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(details);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans(true, params.id);
        setDetails(data[0]);
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
      <div className="host-van-detail-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function Details() {
    return (
      <>
        <p className="host-van-detail-info-details-item">
          <span className="host-van-detail-info-descriptor">Name: </span>
          {details.name}
        </p>
        <p className="host-van-detail-info-details-item">
          <span className="host-van-detail-info-descriptor">Category: </span>
          {capitalizeFirstLetter(details.type)}
        </p>
        <p className="host-van-detail-info-details-item">
          <span className="host-van-detail-info-descriptor">Description: </span>
          {details.description}
        </p>
        <p className="host-van-detail-info-details-item">
          <span className="host-van-detail-info-descriptor">Visibility: </span>
          Public
        </p>
      </>
    );
  }

  function Pricing() {
    return (
      <>
        <p className="host-van-detail-info-pricing-item">
          ${Number.parseFloat(details.price).toFixed(2)}
          <span className="host-van-detail-info-pricing-perday">/day</span>
        </p>
      </>
    );
  }

  function Photos() {
    return (
      <>
        <img
          className="host-van-detail-info-photos-item"
          src={details.imageUrl}
          alt={`Image of van ${details.name}.`}
        />
      </>
    );
  }

  return (
    details && (
      <div className="host-van-detail-wrapper">
        <BackBtn />
        <div className="host-van-detail-content-wrapper">
          <div className="host-van-detail-identity">
            <img src={details.imageUrl} alt={`Image of van ${details.name}.`} />
            <div>
              <p className={`van-type ${details.type} selected`}>
                {details.type}
              </p>
              <h1 className="host-van-detail-name">{details.name}</h1>
              <p className="host-van-detail-rate">
                ${details.price}
                <span className="host-van-detail-rate-perday">/day</span>
              </p>
            </div>
          </div>
          <div className="host-van-detail-navbar">
            <NavLink
              to="."
              end
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="photos"
              className={({ isActive }) => (isActive ? "active-link" : null)}
            >
              Photos
            </NavLink>
          </div>
          <div className="host-van-detail-info-wrapper">
            <Routes>
              <Route index element={<Details />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/photos" element={<Photos />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  );
}
