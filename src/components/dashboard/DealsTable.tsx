
import React from "react";
import { useNavigate } from "react-router-dom";

export type Deal = {
  id: string;
  name: string;
  borrower: string;
  outstanding: string;
  status: "normal" | "warning" | "alert";
};

interface DealsTableProps {
  deals: Deal[];
}

const DealsTable: React.FC<DealsTableProps> = ({ deals }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status: Deal['status']) => {
    if (status === 'alert') {
      return <div className="h-3 w-3 bg-red-500 rounded-full"></div>;
    } else if (status === 'warning') {
      return <div className="h-3 w-3 bg-amber-500 rounded-full"></div>;
    } else {
      return <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>;
    }
  };

  const handleRowClick = (dealId: string) => {
    navigate(`/deals/${dealId}/monitoring`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deal Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Borrower
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Current Outstanding
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {deals.map((deal) => (
            <tr 
              key={deal.id}
              onClick={() => handleRowClick(deal.id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {deal.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {deal.borrower}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {deal.outstanding}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center">
                  {getStatusIcon(deal.status)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;
