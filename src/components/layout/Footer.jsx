import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row gy-4 text-center text-md-start">

          {/* Brand Info */}
          <div className="col-12 col-md-4">
            <h5 className="text-uppercase fw-bold mb-3 text-warning">AworFood</h5>
            <p>
              Delicious meals delivered fresh to your doorstep. Fast, reliable, and satisfying — every time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-4">
            <h5 className="text-uppercase fw-bold mb-3 text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/menu" className="text-white text-decoration-none">Menu</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">Cart</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-6 col-md-4">
            <h5 className="text-uppercase fw-bold mb-3 text-warning">Contact</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-map-marker-alt me-2"></i> Calabar, Nigeria</li>
              <li><i className="fas fa-envelope me-2"></i> support@aworfood.com</li>
              <li><i className="fas fa-phone me-2"></i> +234 706 730 0133</li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Bar */}
        <div className="row text-center text-md-between align-items-center">
          <div className="col-md-6 mb-2 mb-md-0">
            <p className="mb-0">&copy; {new Date().getFullYear()} AworFood. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <a href="#" className="text-white me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
