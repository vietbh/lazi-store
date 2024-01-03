import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types'

function CardBlog({id, title,image}) {

  return (
    <Card key={id} className='mb-4'>
      <a href='/chi-tiet-bai-viet'>
      <Card.Img variant="top" src={image?image:"img/product-1.jpg"} alt={title} />
      </a>
      <Card.Body>
        <Card.Title>
          <a href='/chi-tiet-bai-viet'>
            {title? title:'Bài viết số 1'}
          </a>
        </Card.Title>        
        <Card.Text>
          {`Some quick example text to build on the card title and make up the
          bulk of the card's content.`}
        </Card.Text>
        <p><a className="btn btn-primary btn-large" href="/chi-tiet-bai-viet">Đọc thêm »</a> </p>
      </Card.Body>
    </Card>
  );
}
CardBlog.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardBlog;