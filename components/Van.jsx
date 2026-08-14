export default function Van(props) {
  return (
    <div className="van">
      <img className="van-img" src={props.imgUrl} />
      <div className="van-name-box">
        <p className="van-name">{props.name}</p>
        <p className="van-rate">${props.rate}</p>
      </div>
      <div className="van-footer">
        <p className="van-rate-unit">/day</p>
        <p className="van-type">{props.type}</p>
      </div>
    </div>
  );
}
