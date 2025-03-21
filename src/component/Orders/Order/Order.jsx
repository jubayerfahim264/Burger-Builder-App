const Order = (props) => {
  let ingredientSummery = props.order.ingredient.map((item) => {
    return (
      <span
        key={item.type}
        style={{
          border: "1px solid grey",
          marginRight: "10px",
          marginTop: "10px",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {item.amout}x{" "}
        <strong style={{ textTransform: "capitalize" }}>{item.type}</strong>
      </span>
    );
  });
  return (
    <div
      style={{
        border: "1px solid grey",
        marginBottom: "10px",
        marginTop: "10px",
        boxShadow: "1px 1px 1px #888888",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <p>Order Number : {props.order.id} </p>
      <p>Delivery Address : {props.order.customer.deliveryAddress}</p>
      <hr />
      {ingredientSummery}
      <hr />
      <p>{props.order.price} BDT</p>
    </div>
  );
};
export default Order;
