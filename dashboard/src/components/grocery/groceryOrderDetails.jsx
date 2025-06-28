import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGroceryOrderById,
  deleteGroceryOrder,
  updateOrderStatus,
} from "../../Api";
import Spinner from "../loader";
import { DeleteOutline, Autorenew } from "@mui/icons-material";

const statuses = [
  "pending",
  "processing",
  "confirmed",
  "delivered",
  "cancelled",
];

const GroceryOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getGroceryOrderById(id);
        setOrder(data);
      } catch (err) {
        setError(err.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      setLoading(true);
      await deleteGroceryOrder(order._id);
      navigate("/groceryorders");
    } catch (err) {
      setError(err.message || "Failed to delete order");
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      setUpdating(true);
      await updateOrderStatus(order._id, newStatus);
      setOrder({ ...order, status: newStatus });
    } catch (err) {
      setError(err.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

  return (
    <div className="max-w-full  !m-auto md:!p-6 md:!mt-8 bg-white rounded-lg ">
      <h2 className="text-2xl font-semibold">Order Details</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:!py-10 md:!px-4 shadow rounded">
        <div className="bg-white">
          <h3 className="text-xl font-medium !mb-2">Customer Info</h3>
          <p>
            <span className="font-semibold">Name:</span> {order.customer.name}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {order.customer.phone}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {order.customer.address}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white !px-4 !py-2 rounded shadow cursor-pointer"
        >
          <DeleteOutline className="mr-2" /> Delete Order
        </button>
      </div>

      <div className="bg-white  rounded p-6 mb-6">
        <h3 className="text-xl font-medium mb-4 text-center !py-4">Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.orderItems.map((item) => (
            <div
              key={item._id}
              className="flex bg-gray-50 rounded p-4 items-center gap-2"
            >
              <img
                src={item.product?.images[0]?.url}
                alt={item.product?.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h4 className="font-semibold">
                  {item.product?.name || "Product Unavailabe"}
                </h4>
                <p>Qty: {item.quantity}</p>
                <p>Price: ৳{item.price}</p>
                <p>Subtotal: ৳{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white  rounded !p-2 !mt-6 flex  justify-between items-center">
        <div>
          <h3 className="text-xl font-medium">Total Amount</h3>
          <p className="text-2xl font-bold">৳{order.totalAmount}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <label className="font-medium mr-2">Status:</label>
          <select
            value={order.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          {updating && <Autorenew className="inline-block animate-spin ml-2" />}
        </div>
      </div>
    </div>
  );
};

export default GroceryOrderDetails;
