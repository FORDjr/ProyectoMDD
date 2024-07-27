
const ImplementItem = ({ name, id, quantity }) => {
  return (
    <div className="implement-item">
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Cantidad: {quantity}</p>
    </div>
  );
};

export default ImplementItem;
