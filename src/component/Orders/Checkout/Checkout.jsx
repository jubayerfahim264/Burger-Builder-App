import { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";
import { resetIngredient } from "../../../redux/actionCreation";

const MapStateToProps = (state) => {
  return {
    ingredient: state.ingredient,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId: state.userId,
    token: state.token,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    resetIngredient: () => dispatch(resetIngredient()),
  };
};

class Checkout extends Component {
  state = {
    values: {
      deliveryAddress: "",
      paymentType: "Cash On Delivery",
      phone: "",
    },
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
  };

  goBack = () => {
    // ✅
    this.props.navigate("/");
  };
  inputHandler = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };
  submitHandler = () => {
    this.setState({ isLoading: true });
    const order = {
      ingredient: this.props.ingredient,
      customer: this.state.values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      userId: this.props.userId,
    };
    axios
      .post(
        "https://burger-builder-app-c1d0f-default-rtdb.firebaseio.com/order.json?auth=" +
          this.props.token,
        order
      )
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Order Placed Successfully",
          });
          this.props.resetIngredient();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something went wrong",
          });
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something went wrong",
        });
      });
    // console.log(order);
  };
  render() {
    let form = (
      <div>
        <h4
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px 1px gray",
            width: "100%",
            padding: "1rem",
            margin: "1rem 0",
            borderRadius: "8px",
          }}
        >
          Total Price{" "}
          <strong style={{ color: "#d70f64" }}>
            {this.props.totalPrice} BDT
          </strong>
        </h4>
        <form
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px 1px gray",
            width: "100%",
            padding: "1rem",
            margin: "1rem 0",
            borderRadius: "8px",
          }}
        >
          <textarea
            name="deliveryAddress"
            value={this.state.values.deliveryAddress}
            placeholder="Your address"
            className="form-control my-4"
            onChange={(e) => this.inputHandler(e)}
          ></textarea>

          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Phone"
            className="form-control my-4"
            value={this.state.values.phone}
            onChange={(e) => this.inputHandler(e)}
          />

          <select
            name="paymentType"
            className="form-control my-4"
            value={this.state.values.paymentType}
            onChange={(e) => this.inputHandler(e)}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
          </select>

          <Button
            style={{
              background: "#d70f64",
              border: "none",
            }}
            onClick={this.submitHandler}
            disabled={!this.props.purchasable}
          >
            🚀 Place Order
          </Button>

          <Button className="ms-2 bg-white" onClick={this.goBack}>
            ❌
          </Button>
        </form>
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p>{this.state.modalMsg}</p>
            <Button color="white" onClick={this.goBack}>
              ❌
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(Checkout);
