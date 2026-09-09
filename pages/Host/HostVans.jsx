import React from "react";

import HostVan from "../../components/HostVan";

export default function HostVans() {
  const [vans, setVans] = React.useState(null);
  console.log(vans);

  React.useEffect(() => {
    const controller = new AbortController();

    fetch("/api/host/vans")
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
