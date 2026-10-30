// Delays execution of async functions for specified number of milliseconds
// await sleep(2000) => pauses function for 2 seconds
export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export async function getVans(isHost, id) {
  const url = id
    ? `/api/${isHost ? "host/" : ""}vans/${id}`
    : `/api/${isHost ? "host/" : ""}vans`;
  const res = await fetch(url);
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

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
