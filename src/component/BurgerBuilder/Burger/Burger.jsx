import Ingredient from "../Ingredient/Ingredient";
import "./burger.css";
const Burger = (props) => {
  let ingreArr = props.ingredient
    .map((item) => {
      let amoutArr = [...Array(item.amout).keys()];
      // console.log(amoutArr);
      return amoutArr.map(() => {
        return <Ingredient type={item.type} key={Math.random(0)} />;
      });
    })
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);

  // console.log(ingreArr);
  if (ingreArr.length === 0) {
    ingreArr = <p>Please add something</p>;
  }
  return (
    <div className="burger">
      <Ingredient type="bread-top" />
      {ingreArr}
      <Ingredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
