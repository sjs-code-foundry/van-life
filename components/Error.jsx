export default function Error(props) {
  const err = props.error;
  console.log(err);

  return (
    <div className="error-container">
      <h1>Error loading vans</h1>
      <div>
        <h2 aria-live="assertive">Error message: {err.message}</h2>
        <h2 aria-live="assertive">Error code: {err.status}</h2>
        <h2 aria-live="assertive">Error type: {err.statusText}</h2>
      </div>
    </div>
  );
}
