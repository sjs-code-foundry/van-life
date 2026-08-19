import React from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const params = useParams();
  console.log(params);

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
        setDetails(data);
      });

    return () => controller.abort();
  }, [params.id]);

  return <h1>Van detail page goes here.</h1>;
}
