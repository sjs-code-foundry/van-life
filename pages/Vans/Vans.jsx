import React from "react";
import { useSearchParams } from "react-router-dom";

import Van from "../../components/Van";

export default function Vans() {
  const [vans, setVans] = React.useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");
  console.log(typeFilter);

  React.useEffect(() => {
    const controller = new AbortController();

    fetch("/api/vans")
      .then((res) => {
        if (!res.ok) {
          throw Error("Vans fetch request failed.");
        }
        return res.json();
      })
      .then((data) => {
        setVans(data.vans);
      });

    return () => controller.abort();
  }, []);

  function mapVans() {
    if (vans) {
      const vanEls = vans.map((van) => {
        if (typeFilter) {
          if (van.type !== typeFilter) {
            return null;
          }
        }
        return (
          <Van
            key={van.id}
            id={van.id}
            imgUrl={van.imageUrl}
            name={van.name}
            rate={van.price}
            type={van.type}
          ></Van>
        );
      });
      return vanEls;
    } else {
      return <p>No vans yet.</p>;
    }
  }

  return <div className="van-grid">{mapVans()}</div>;
}
