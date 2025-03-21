import { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summery from "./Summery/Summery";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { withRouter } from "../withRouter"; // withRouter Import
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  updatePurchasable,
} from "../../redux/actionCreation";

const mapStateToProps = (state) => {
  return {
    ingredient: state.ingredient,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (type) => dispatch(addIngredient(type)),
    removeIngredient: (type) => dispatch(removeIngredient(type)),
    updatePurchasable: () => dispatch(updatePurchasable()),
  };
};
class BurgerBuilder extends Component {
  state = {
    ModalOpen: false,
  };

  toggleModal = () => {
    this.setState({ ModalOpen: !this.state.ModalOpen });
  };

  addIngredient = (type) => {
    this.props.addIngredient(type);
    this.props.updatePurchasable();
  };

  removeIngredient = (type) => {
    this.props.removeIngredient(type);
    this.props.updatePurchasable();
  };

  handleCheckout = () => {
    this.props.navigate("/checkout"); // ✅
  };
  render() {
    return (
      <div>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredient={this.props.ingredient} />
          <Controls
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            totalPrice={this.props.totalPrice}
            OpenModal={this.toggleModal}
            purchasable={this.props.purchasable}
          />
        </div>
        <Modal isOpen={this.state.ModalOpen}>
          <ModalHeader>Your Order Summary</ModalHeader>
          <ModalBody>
            <h5>Total Price: {this.props.totalPrice} BDT</h5>
            <Summery ingredient={this.props.ingredient} />
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={this.handleCheckout}
              style={{
                background: "#d70f64",
                border: "none",
              }}
            >
              🚀 Continue Checkout
            </Button>
            <Button onClick={this.toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BurgerBuilder));
