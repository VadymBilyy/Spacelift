import Image from "./morty.jpeg";
import "./styles.css";

const LoadingIndicator = () => (
  <div className="loading-indicator__wrapper" data-testid={"loading-indicator"}>
    <img src={Image} alt="loading indicator" className="loading-indicator" />
  </div>
);

export default LoadingIndicator;
