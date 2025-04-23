
import { Deal } from "@/pages/dashboard/DashboardPage";

interface DealStatsProps {
  deals: Deal[];
}

const DealStats = ({ deals }: DealStatsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">My Deals</h1>
      <div className="text-sm text-gray-500">
        Total Deals: {deals.length}
      </div>
    </div>
  );
};

export default DealStats;
