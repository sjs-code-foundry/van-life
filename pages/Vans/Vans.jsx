import React from "react";
import { useSearchParams, Link } from "react-router-dom";

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
      const vanEls = vans
        .filter((van) => {
          if (typeFilter) {
            return van.type === typeFilter;
          } else return true;
        })
        .map((van) => {
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

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-btns">
        <Link className="van-type simple" to="?type=simple">
          Simple
        </Link>
        <Link className="van-type luxury" to="?type=luxury">
          Luxury
        </Link>
        <Link className="van-type rugged" to="?type=rugged">
          Rugged
        </Link>
        <Link className="van-type clear-filters" to=".">
          Clear filters
        </Link>
      </div>
      <div className="van-grid">{mapVans()}</div>
    </div>
  );
}
