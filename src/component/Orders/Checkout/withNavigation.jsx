import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export const withNavigation = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};
