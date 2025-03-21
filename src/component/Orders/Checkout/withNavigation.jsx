import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
