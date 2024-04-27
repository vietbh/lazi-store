import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

function ImageCPN({image,className,heigth,width}) {
  return <Image className={className} src={image} height={heigth} width={width} thumnail/>;
}

ImageCPN.propTypes = {
    image: PropTypes.string,
    className: PropTypes.string,
    heigth: PropTypes.string,
    width: PropTypes.string,
  };
export default ImageCPN;