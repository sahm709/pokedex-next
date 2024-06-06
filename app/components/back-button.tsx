import { memo } from "react";
import "./css/back-button.css";
interface props {
  onClick: () => void;
}
function BackButton({ onClick }: props) {
  return (
    <div className="back-button" onClick={onClick}>
      <span className="arrow arrow-left"></span>
    </div>
  );
}

export default memo(BackButton);
