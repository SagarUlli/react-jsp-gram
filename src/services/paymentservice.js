import api from "./api";

export const createOrder = () => {
  return api.post("/payments/create-order");
};

export const verifyPayment = (data) => {
  return api.post("/payments/verify", data);
};

export const getPaymentStatus = () => {
  return api.get("/payments/status");
};
