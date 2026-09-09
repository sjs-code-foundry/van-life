import React from "react";
import { useParams } from "react-router-dom";

export default function HostVanDetail() {
  const params = useParams();

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
    <h1>{`Van Detail page for "${details.name}" goes here`}</h1>
  ) : (
    <h1>Loading...</h1>
  );
}
