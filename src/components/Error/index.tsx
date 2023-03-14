import { FC } from "react";
import Image from "./morty.jpeg";
import "./styles.css";

interface ErrorHandlerProps {
  onRefetch: () => void;
}

const ErrorHandler: FC<ErrorHandlerProps> = ({ onRefetch }) => (
  <div className="error-indicator__wrapper">
    <div>
      <p>Something went wrong, please try again!</p>
      <img src={Image} alt="error" className="error-indicator" />
    </div>
    <button onClick={onRefetch}>Try again</button>
  </div>
);

export default ErrorHandler;
