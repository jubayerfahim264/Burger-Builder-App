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
  // componentDidUpdate() {
  //   console.log(this.props);
  // }
  render() {
    let order = null;
    if (this.props.orderError) {
      order = (
        <p
          style={{
            border: "1px solid grey",
            marginBottom: "10px",
            marginTop: "10px",
            boxShadow: "1px 1px 1px #888888",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          Sorry failed to load order
        </p>
      );
    } else {
      if (this.props.order.length === 0) {
        order = (
          <p
            style={{
              border: "1px solid grey",
              marginBottom: "10px",
              marginTop: "10px",
              boxShadow: "1px 1px 1px #888888",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            You Have no order
          </p>
        );
      } else {
        order = this.props.order.map((order) => {
          return <Order order={order} key={order.id} />;
        });
      }
    }

    return <div>{this.props.ordersLoading ? <Spinner /> : order}</div>;
  }
}
export default connect(mapStateToProps, MapDispatchToProps)(Orders);
