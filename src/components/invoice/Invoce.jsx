import React, { useEffect } from 'react'
import "./invoice.css"
import MetaData from '../layout/MetaData'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useOrderDetailsQuery } from '../../redux/api/orderApi';
import LoadingSpinner from '../layout/LoadingSpinner';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Invoce = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(id);
  const order = data?.order || {};

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    createdAt,
    user,
    paymentMethod,
    orderStatus,
  } = order;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleDownloadInvoice = () => {
    const input = document.getElementById("order_invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 0);
      pdf.save(`payment_invoice_${order?._id}.pdf`);
    });
  };

  if (isLoading) return <LoadingSpinner />;

  // 🔁 Handle COD display logic
  const displayPaymentStatus =
    paymentMethod === "COD" && orderStatus === "Delivered"
      ? "PAID"
      : paymentInfo?.status?.toUpperCase() || "NOT PAID";

  return (
    <>
      <MetaData title={"Order Invoice"} />
      <div className="order-invoice my-5">
        <div className="row d-flex justify-content-center mb-5">
          <button className="btn btn-success col-md-5" onClick={handleDownloadInvoice}>
            <i className="fa fa-print"></i> Download Invoice
          </button>
        </div>
        <div id="order_invoice" className="p-3 border border-secondary">
          <header className="clearfix">
            <h2 className="fw-bold text-center mb-4">
              <span style={{ color: '#e74c3c' }}>Awor</span><span style={{ color: '#000' }}>Food</span>
            </h2>
            <h1> PAYMENT INVOICE # {order?._id}</h1>
            <div id="company" className="clearfix">
              <div>AworFood</div>
              <div>455 Calabar Heights,<br />AZ 540420, Nigeria</div>
              <div>(234) 706-730-0133</div>
              <div>
                <a href="mailto:info@shopit.com">info@aworfood.com</a>
              </div>
            </div>
            <div id="project">
              <div><span>Name</span> {user?.name}</div>
              <div><span>EMAIL</span> {user?.email}</div>
              <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
              <div>
                <span>ADDRESS</span> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
              </div>
              <div><span>DATE</span> {new Date(createdAt).toLocaleString()}</div>
              <div><span>Status</span> {displayPaymentStatus}</div>
            </div>
          </header>
          <main>
            <table className="mt-5">
              <thead>
                <tr>
                  <th className="service">ID</th>
                  <th className="desc">NAME</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {orderItems?.map((item) => (
                  <tr key={item?._id}>
                    <td className="service">{item?.food}</td>
                    <td className="desc">{item?.name}</td>
                    <td className="unit">${item?.price}</td>
                    <td className="qty">{item?.quantity}</td>
                    <td className="total">${(item?.price * item?.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4"><b>SUBTOTAL</b></td>
                  <td className="total">${order?.itemsPrice}</td>
                </tr>
                <tr>
                  <td colSpan="4"><b>TAX 15%</b></td>
                  <td className="total">${order?.taxAmount}</td>
                </tr>
                <tr>
                  <td colSpan="4"><b>SHIPPING</b></td>
                  <td className="total">${order?.shippingAmount}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="grand total"><b>GRAND TOTAL</b></td>
                  <td className="grand total">${order?.totalAmount}</td>
                </tr>
              </tbody>
            </table>
            <div id="notices">
              <div>NOTICE:</div>
              <div className="notice">
                A finance charge of 1.5% will be made on unpaid balances after 30 days.
              </div>
            </div>
          </main>
          <footer>
            Invoice was created on a computer and is valid without the signature.
          </footer>
        </div>
      </div>
    </>
  )
}

export default Invoce
