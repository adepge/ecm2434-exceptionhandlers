function Polaroid() {
  return (
    <div className="polaroid">
      <img src={props.image} alt="polaroid" />
      <div className="caption">{props.caption}</div>
    </div>
  );
}

export default Polaroid;
