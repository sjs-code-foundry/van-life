import React from "react";

import Van from "../components/Van";

export default function Vans() {
  const [vans, setVans] = React.useState(null);

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
        return (
          <Van key={van.id} name={van.name} rate={van.price} type={van.type} />
        );
      });
      return vanEls;
    } else {
      return <p>No vans yet.</p>;
    }
  }

  return <div className="van-grid">{mapVans()}</div>;
}
