import React from "react";
import { Link, useParams } from "react-router-dom";

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
    // <h1>{`Van Detail page for "${details.name}" goes here`}</h1>
    <div>
      <Link
        to={`/host/vans/`}
        aria-label={`Back to the list of the host's vans.`}
      >
        <svg
          width="14"
          height="11"
          viewBox="0 0 14 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6501 5.77521C13.0315 5.77521 13.3406 5.46606 13.3406 5.08472C13.3406 4.70337 13.0315 4.39423 12.6501 4.39423V5.77521ZM0.202231 4.59647C-0.0674219 4.86612 -0.0674219 5.30331 0.202231 5.57297L4.59649 9.96723C4.86615 10.2369 5.30334 10.2369 5.573 9.96723C5.84265 9.69758 5.84265 9.26038 5.573 8.99073L1.66699 5.08472L5.573 1.17871C5.84265 0.909053 5.84265 0.471859 5.573 0.202205C5.30334 -0.0674491 4.86615 -0.0674491 4.59649 0.202205L0.202231 4.59647ZM12.6501 4.39423L0.690483 4.39423V5.77521L12.6501 5.77521V4.39423Z"
            fill="#858585"
          />
        </svg>
        <p>Back to all vans</p>
      </Link>
      <div>
        <img src={details.imageUrl} alt={`Image of van ${details.name}.`} />
        <div>
          <p>{details.type}</p>
          <h1>{details.name}</h1>
          <p>
            ${details.price}
            <span>/day</span>
          </p>
        </div>
      </div>
      <div>
        <p>Details</p>
        <p>Pricing</p>
        <p>Photos</p>
      </div>
      <div>
        <p>Details go here, can be switched between pricing and photos.</p>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
