import React from "react";
import { useSearchParams } from "react-router-dom";

import clsx from "clsx";

import { getVans } from "../../api";

import Van from "../../components/Van";

export default function Vans() {
  const [vans, setVans] = React.useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  React.useEffect(() => {
    const controller = new AbortController();

    // fetch("/api/vans")
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw Error("Vans fetch request failed.");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setVans(data.vans);
    //   });

    async function loadVans() {
      const data = await getVans();
      setVans(data);
    }

    loadVans();

    return () => controller.abort();
  }, []);

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

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
              state={{
                search: `?${searchParams.toString()}`,
                type: typeFilter,
              }}
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
        <button
          className={clsx(
            "van-type",
            "simple",
            typeFilter === "simple" && "selected",
          )}
          onClick={() => handleFilterChange("type", "simple")}
        >
          Simple
        </button>
        <button
          className={clsx(
            "van-type",
            "luxury",
            typeFilter === "luxury" && "selected",
          )}
          onClick={() => handleFilterChange("type", "luxury")}
        >
          Luxury
        </button>
        <button
          className={clsx(
            "van-type",
            "rugged",
            typeFilter === "rugged" && "selected",
          )}
          onClick={() => handleFilterChange("type", "rugged")}
        >
          Rugged
        </button>
        {searchParams.size ? (
          <button
            className="van-type clear-filters"
            onClick={() => handleFilterChange("type", null)}
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-grid">{mapVans()}</div>
    </div>
  );
}
