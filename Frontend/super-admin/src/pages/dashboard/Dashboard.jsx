import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function Dashboard() {
  const navigate = useNavigate(); // ✅ MUST be inside component

  const handleLogout = () => {
    const role = localStorage.getItem("role");

    logout(); // clear token

    if (role === "ADMIN") {
      navigate("/admin/login");
    } else {
      navigate("/artisan/login");
    }
  };

  return (
    <div className="dashboard">

      {/* Top Banner */}
      <div className="banner">
        <div>
          <h2>Good morning, Rajesh! ✦</h2>
          <p>Here's how your artisan shop is performing today.</p>
          <button className="btn">📈 Revenue up 18% this week</button>
        </div>

        {/* ✅ FIX: attach function */}
        <button className="Logout" onClick={handleLogout}>
          Logout
        </button>

        <span className="date">April 2, 2026</span>
      </div>

      {/* Stats Cards */}
      <div className="cards">

        <div className="card">
          <h4>Total Revenue</h4>
          <h2>₹48,250</h2>
          <p>This month: ₹12,340</p>
        </div>

        <div className="card">
          <h4>Active Orders</h4>
          <h2 className="orange">23</h2>
          <p>8 pending, 15 shipped</p>
        </div>

        <div className="card">
          <h4>Listed Products</h4>
          <h2>42</h2>
          <p>38 approved, 4 pending</p>
        </div>

        <div className="card">
          <h4>Pending Enquiries</h4>
          <h2 className="red">5</h2>
          <p>Respond within 24hrs</p>
        </div>

      </div>

      {/* Charts Section */}
      <div className="charts">

        <div className="chart-box">
          <h3>Sales Overview</h3>
          <p>Revenue & order trends</p>

          <div className="chart-placeholder">
            📊 (Chart here - we add later)
          </div>
        </div>

        <div className="category-box">
          <h3>Category Sales</h3>

          <div className="bar"><span style={{width:"80%"}}>Pottery</span></div>
          <div className="bar"><span style={{width:"65%"}}>Textiles</span></div>
          <div className="bar"><span style={{width:"50%"}}>Woodwork</span></div>
          <div className="bar"><span style={{width:"35%"}}>Jewelry</span></div>
          <div className="bar"><span style={{width:"20%"}}>Other</span></div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;