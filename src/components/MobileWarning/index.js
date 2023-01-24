import "./index.scss";

const MobileWarning = ({ setUserHasBeenWarned, extraText = null }) => {
  return (
    <div className="warning-div">
      <div className="warning-text">
        Hi, <br />
        It looks like you're visiting this site from a mobile device. I haven't
        made the site compatible with screens this size yet (working on it).
        Please visit the from a larger device, or expand the width of the
        window. <br />
        {extraText}
      </div>
      <div>
        <button
          className="warning-button"
          onClick={() => {
            setUserHasBeenWarned(true);
          }}
        >
          I don't care show me it anyway
        </button>
      </div>
    </div>
  );
};

export default MobileWarning;
