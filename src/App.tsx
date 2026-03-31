import { Routes, Route } from "react-router-dom";
import AppLayout from "./app/layout/AppLayout";
import Dashboard from "./app/pages/Dashboard/Dashboard";
import Customers from "./app/pages/Customers/Customers";
import Orders from "./app/pages/Orders/Orders";
import Products from "./app/pages/Products/Products";
import Team from "./app/pages/Team/Team";
import Settings from "./app/pages/Settings/Settings";

// Pages

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
