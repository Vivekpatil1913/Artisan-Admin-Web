// import { useEffect, useState } from "react";
// import { getOrders } from "../services/orderService";
// import "../styles/order.css";
// function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     const res = await getOrders();
//     setOrders(res.data);
//   };

//   return (
//     <div className="orders-container">
//       <h2>Orders</h2>

//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Product</th>
//             <th>Amount</th>
//             <th>Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.map((o) => (
//             <tr key={o._id}>
//               <td>{o.orderId}</td>
//               <td>{o.customer}</td>
//               <td>{o.products.join(", ")}</td>
//               <td>₹{o.amount}</td>
//               <td>{new Date(o.date).toLocaleDateString()}</td>
//               <td>
//                 <span className={`status ${o.status.toLowerCase()}`}>
//                   {o.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Orders;
import "../../styles/order.css";

function Orders() {
  const orders = [
    {
      id: "ORD-1234",
      customer: "Priya Sharma",
      product: "Blue Pottery Vase",
      amount: "₹1,250",
      date: "20 Mar 2026",
      status: "Pending",
    },
    {
      id: "ORD-1233",
      customer: "Amit Patel",
      product: "Block Print Saree x2",
      amount: "₹6,800",
      date: "19 Mar 2026",
      status: "Accepted",
    },
    {
      id: "ORD-1232",
      customer: "Sunita Devi",
      product: "Wooden Elephant",
      amount: "₹2,100",
      date: "18 Mar 2026",
      status: "Packed",
    },
    {
      id: "ORD-1231",
      customer: "Vikram Singh",
      product: "Cushion Cover Set",
      amount: "₹3,400",
      date: "17 Mar 2026",
      status: "Shipped",
    },
    {
      id: "ORD-1230",
      customer: "Meera Joshi",
      product: "Terracotta Lamp",
      amount: "₹680",
      date: "16 Mar 2026",
      status: "Delivered",
    },
    {
      id: "ORD-1229",
      customer: "Priya Sharma",
      product: "Blue Pottery Vase",
      amount: "₹1,250",
      date: "15 Mar 2026",
      status: "Cancelled",
    },
  ];

  return (
    <div className="orders-page">
      <h2>Orders</h2>

      {/* Tabs */}
      <div className="tabs">
        <span className="active">All Orders <b>35</b></span>
        <span>Pending <b>6</b></span>
        <span>Accepted <b>6</b></span>
        <span>Packed <b>6</b></span>
        <span>Shipped <b>6</b></span>
        <span>Delivered <b>6</b></span>
        <span>Cancelled <b>5</b></span>
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product(s)</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={i}>
                <td className="order-id">{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td className="amount">{o.amount}</td>
                <td>{o.date}</td>

                <td>
                  <span className={`status ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>

                <td className="view">View Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;