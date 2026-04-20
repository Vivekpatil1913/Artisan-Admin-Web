import axios from "axios";

const API = "http://localhost:5001/api/orders";

export const getOrders = () => axios.get(API);

export const getOrdersByStatus = (status) =>
  axios.get(`${API}/status/${status}`);

export const updateOrderStatus = (id, status) =>
  axios.put(`${API}/${id}`, { status });