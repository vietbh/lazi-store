import PropTypes from 'prop-types';

const ProductLowPrice = ({ product }) => {
  const lowestPriceVariation = product.variations.reduce((lowestPrice, variation) => {
    const price = parseFloat(variation.price);
    return price < lowestPrice ? price : lowestPrice;
  }, Infinity);
  
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Lowest Price: {lowestPriceVariation.toFixed(2)}</p>
    </div>
  );
};

ProductLowPrice.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    variations: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default ProductLowPrice;