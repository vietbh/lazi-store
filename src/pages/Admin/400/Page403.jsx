import { Link } from "react-router-dom";

function Page403() {
  const fontSize = {
    fontSize: '56px',
  };

  const fontSizeMediaQuery = {
    '@media (min-width: 768px)': {
      fontSize: '260px',
    },
  };

  return (
    <>
      <div className="h-100 w-100 text-center">
        <h3 style={{ height: 500 }}>
          <p>
            Không tồn tại trang này.{" "}
            <Link className="text-decoration-underline fs-4" to={"/"}>
              Trở lại trang chủ
            </Link>
          </p>
          <p className="text-warning" style={{ ...fontSize, ...fontSizeMediaQuery }}>
            403
          </p>
        </h3>
      </div>
    </>
  );
}

export default Page403;