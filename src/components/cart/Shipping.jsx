import React, { useEffect, useState } from 'react';
import { countries } from 'countries-list';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/features/cartSlice';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {
  const countryList = Object.values(countries);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const naviage = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo.address);
      setCity(shippingInfo.city);
      setZipCode(shippingInfo.zipCode);
      setCountry(shippingInfo.country);
      setPhoneNo(shippingInfo.phoneNo);
    }
  }, [shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, zipCode, country, phoneNo }));
    naviage('/confirm_order');
  };

  return (
    <>
        <MetaData title={"Shipping Info"}/>

        <CheckoutSteps shipping />

        <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="row w-75 justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <form
                onSubmit={submitHandler}
                className="shadow rounded bg-white p-4"
                style={{ maxWidth: '500px', margin: '0 auto' }}
            >
                <h2 className="text-center mb-4 text-danger fw-bold">My Shipping Info</h2>

                <div className="mb-3">
                <label htmlFor="address_field" className="form-label fw-semibold">Address</label>
                <input
                    type="text"
                    id="address_field"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="123 Main Street"
                />
                </div>

                <div className="mb-3">
                <label htmlFor="city_field" className="form-label fw-semibold">City</label>
                <input
                    type="text"
                    id="city_field"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="Lagos"
                />
                </div>

                <div className="mb-3">
                <label htmlFor="phone_field" className="form-label fw-semibold">Phone Number</label>
                <input
                    type="tel"
                    id="phone_field"
                    className="form-control"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    required
                    placeholder="+234 800 000 0000"
                />
                </div>

                <div className="mb-3">
                <label htmlFor="postal_code_field" className="form-label fw-semibold">Postal Code</label>
                <input
                    type="number"
                    id="postal_code_field"
                    className="form-control"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                    placeholder="100001"
                />
                </div>

                <div className="mb-4">
                <label htmlFor="country_field" className="form-label fw-semibold">Country</label>
                <select
                    id="country_field"
                    className="form-select"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                >
                    <option value="">-- Select Country --</option>
                    {countryList.map((country) => (
                    <option key={country?.name} value={country?.name}>
                        {country?.name}
                    </option>
                    ))}
                </select>
                </div>

                <button type="submit" className="btn btn-danger w-100 py-2">
                    Continue to Payment
                </button>
            </form>
            </div>
        </div>
        </div>
    </>
  );
};

export default Shipping;
