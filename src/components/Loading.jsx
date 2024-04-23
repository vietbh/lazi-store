import PropTypes from 'prop-types';
function Loading(props) {
    return (
        <div className={props.className}>
            <div className="d-flex justify-content-center">
                <img src={'img/Spin-1s-200px.gif'} style={{width:props.width??100+'px',height:props.height??100+'px'}} className='img-fluid'  alt='Spin-1s-200px.gif'/>
            </div>
        </div>
    );
}
Loading.propTypes ={
    className:PropTypes.string,
    width:PropTypes.number,
    height:PropTypes.number,
}
export default Loading;