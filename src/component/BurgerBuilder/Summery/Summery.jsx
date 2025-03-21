const Summery = (props) => {
  const orderSummary = props.ingredient.map((item) => {
    return (
      <li
        key={item.type}
        style={{
          listStyle: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textTransform: "capitalize",
          margin: "10px 0",
          fontSize: "18px",
          fontWeight: "500",
          color: "#d70f65",
        }}
      >
        <span>{item.type} :</span>
        {item.amout}
      </li>
    );
  });
  return (
    <div>
      <ul>{orderSummary}</ul>
    </div>
  );
};
export default Summery;
