import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="loader">
      <span>&lt;</span>
      <span>Building Burger</span>
      <span>/&gt;</span>
    </div>
  );
};
export default Spinner;
