import { useState, useEffect } from "react";

import { getVans } from "../../api";

import Error from "../../components/Error";
import HostVan from "../../components/HostVan";

export default function HostVans() {
  const [vans, setVans] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVans(true);
        setVans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="host-van-list">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  function mapVans() {
    if (vans) {
      const vanEls = vans.map((van) => {
        return (
          <HostVan
            key={van.id}
            id={van.id}
            imgUrl={van.imageUrl}
            name={van.name}
            rate={van.price}
            type={van.type}
          ></HostVan>
        );
      });
      return vanEls;
    } else {
      return <p>No vans yet.</p>;
    }
  }

  return <div className="host-van-list">{mapVans()}</div>;
}
