export default function Van(props) {
  return (
    <div className="van">
      <img className="van-img" />
      <p className="van-name">{props.name}</p>
      <div className="van-rate-box">
        <p className="van-rate">${props.rate}</p>
        <p>/day</p>
      </div>
      <p className="van-type">{props.type}</p>
    </div>
  );
}
