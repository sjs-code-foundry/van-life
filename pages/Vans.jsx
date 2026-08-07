import React from "react";

export default function Vans() {
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
        console.log(data);
      });

    return () => controller.abort();
  }, []);

  return <h1>Vans page goes here 🚐</h1>;
}
