import { useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export function withRouter(Component) {
  return function WithRouterComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
