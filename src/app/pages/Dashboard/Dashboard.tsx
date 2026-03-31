import DeviceComparisonChart from "./components/DeviceComparisonChart/DeviceComparisonChart";
import SalesGraph from "./components/SalesGraph/SalesGraph";
import Summary from "./components/Summary/Summary";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <Summary />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SalesGraph />
        <DeviceComparisonChart />
      </div>
    </div>
  );
};

export default Dashboard;
