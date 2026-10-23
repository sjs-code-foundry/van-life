export async function getVans() {
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

  const res = await fetch("/api/vans");
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}
