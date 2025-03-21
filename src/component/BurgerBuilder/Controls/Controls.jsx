import { Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];
const BuildControls = (props) => {
  return (
    <div className="d-flex p-1">
      <div className="mr-auto" style={{ fontWeight: "600" }}>
        {props.label}
      </div>
      <button
        className="ms-auto btn btn-danger btn-sm m-1"
        onClick={props.remove}
      >
        Less
      </button>
      <button className="btn btn-success btn-sm m-1" onClick={props.add}>
        More
      </button>
    </div>
  );
};
const Controls = (props) => {
  return (
    <div className="container ml-md-5" style={{ textAlign: "center" }}>
      <Card
        style={{ marginTop: "30px", marginBottom: "30px", textAlign: "center" }}
      >
        <CardHeader
          style={{
            background: "#d70f64",
            color: "white",
          }}
        >
          <h4>Add Ingredient</h4>
        </CardHeader>
        <CardBody>
          {controls.map((item) => {
            return (
              <BuildControls
                label={item.label}
                type={item.type}
                key={Math.random()}
                add={() => props.addIngredient(item.type)}
                remove={() => props.removeIngredient(item.type)}
              />
            );
          })}
        </CardBody>
        <CardFooter>
          <h5>
            Price: <strong className="text-primary">{props.totalPrice}</strong>{" "}
            BDT
          </h5>
        </CardFooter>
        <Button
          style={{
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            padding: "10px",
            fontSize: "20px",
            textTransform: "capitalize",
            background: "#d70f64",
            border: "none",
          }}
          disabled={!props.purchasable}
          onClick={props.OpenModal}
        >
          Order Now
        </Button>
      </Card>
    </div>
  );
};
export default Controls;
