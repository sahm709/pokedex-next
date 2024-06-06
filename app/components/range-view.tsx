import { CSSProperties } from "react";
import "./css/range-view.css";
interface RangeViewProps {
  value?: number;
  max?: number;
}
interface CustomCSSProperties extends CSSProperties {
  "--percent"?: string;
}
const RangeView = ({ value = 50, max = 100 }: RangeViewProps) => {
  const percent = (value / max) * 100;
  const colorClass =
    percent >= 50 ? "range-view-positive" : "range-view-negative";
  const customStyles: CustomCSSProperties = { "--percent": `${percent}%` };

  return <div className={`range-view ${colorClass}`} style={customStyles} />;
};

export default RangeView;
