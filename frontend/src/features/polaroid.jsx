import "./stylesheets/polaroid.css";

function Polaroid({ src, func, rotation }) {
  return (
    <div
      className="polaroid"
      style={{ transform: `rotate(${rotation}deg)` }}
      onClick={func}
    >
      <div className="padding">
        <img src={src} alt="polaroid" style={{ width: "100%" }} />
        <div className="caption">
          hellossdafasj;lk
          as;djfa;jsfdajf;sdasdjfkasjfdjl;ajsdfajsfdlkajsdflkjdsalkfjlkj
        </div>
      </div>
    </div>
  );
}

export default Polaroid;
