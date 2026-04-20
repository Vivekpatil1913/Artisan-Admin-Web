import {
  LayoutDashboard,
  Box,
  Package,
  Wallet,
  MessageSquare,
  Store,
  Headphones
} from "lucide-react";

import "../../styles/layout.css";

function Sidebar() {
  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <span>✨</span> Artisan Panel
        </h2>
      </div>

      {/* Menu */}
      <ul className="menu">

        <li className="active">
          <LayoutDashboard size={20} />
          Dashboard
        </li>

        <li>
          <Box size={20} />
          My Products
        </li>

        <li>
          <Package size={20} />
          Orders
        </li>

        <li>
          <Wallet size={20} />
          Earnings
        </li>

        <li>
          <MessageSquare size={20} />
          Enquiries
        </li>

        <li>
          <Store size={20} />
          My Shop
        </li>

        <li>
          <Headphones size={20} />
          Support
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;