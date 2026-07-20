import { createOrder, verifyPayment } from "../services/paymentService";

function Prime() {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Unable to load Razorpay.");
      return;
    }

    const orderResponse = await createOrder();

    const order = orderResponse.data.data;

    const options = {
      key: order.key,

      amount: order.amount,

      currency: order.currency,

      order_id: order.orderId,

      name: "JSPGram",

      description: "Prime Membership",

      handler: async function (response) {
        await verifyPayment({
          razorpayOrderId: response.razorpay_order_id,

          razorpayPaymentId: response.razorpay_payment_id,

          razorpaySignature: response.razorpay_signature,
        });

        alert("Payment Successful");

        window.location.href = "/profile";
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Prime Membership</h2>

      <p>Upgrade your account for premium features.</p>

      <button className="btn btn-warning" onClick={handlePayment}>
        Upgrade to Prime
      </button>
    </div>
  );
}

export default Prime;
