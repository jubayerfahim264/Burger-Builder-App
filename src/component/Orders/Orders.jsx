import { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../../redux/actionCreation";
import Order from "./Order/Order";
import Spinner from "../Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    order: state.order,
    ordersLoading: state.ordersLoading,
    orderError: state.orderError,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(fetchOrder()),
  };
};

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrder();
  }
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    let order = this.props.order.map((order) => {
      return <Order order={order} key={order.id} />;
    });
    return <div>{this.props.ordersLoading ? <Spinner /> : order}</div>;
  }
}
export default connect(mapStateToProps, MapDispatchToProps)(Orders);
