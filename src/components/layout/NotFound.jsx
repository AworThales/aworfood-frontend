import React from 'react';
import MetaData from './MetaData';

const NotFound = () => {
  return (
    <>
        <MetaData title={"Not Found"} />
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 text-center">
                <img
                    src="/images/404.svg"
                    alt="404_not_found"
                    className="img-fluid"
                />
                <h5 className="mt-4 text-dark">
                    Page Not Found. Back to <a href="/" className="text-primary text-decoration-none">Homepage</a>
                </h5>
                </div>
            </div>
        </div>
    </>
  );
};

export default NotFound;
