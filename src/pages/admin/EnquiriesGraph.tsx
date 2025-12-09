import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EnquiriesGraphProps {
  serviceData: any;
}

const EnquiriesGraph: React.FC<EnquiriesGraphProps> = ({ serviceData }) => {
  const [activeRange, setActiveRange] = useState<
    "Weekly" | "Monthly" | "Yearly"
  >("Monthly");

  const graphData = serviceData?.graphData || {
    Weekly: [],
    Monthly: [],
    Yearly: [],
  };
  const data = graphData[activeRange] || [];

  const xAxisLabel =
    activeRange === "Weekly"
      ? "Day wise enquiries"
      : activeRange === "Monthly"
      ? "Week wise enquiries"
      : "Month wise enquiries";

  return (
    <div className="w-full h-auto p-4 sm:p-6 rounded-[14px] bg-white shadow flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="text-[18px] font-medium text-[#292929]">Enquiries</h2>
        <div className="flex gap-4 sm:gap-6 text-[12px]">
          {["Weekly", "Monthly", "Yearly"].map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range as any)}
              className={
                activeRange === range
                  ? "font-bold text-[#292929]"
                  : "font-normal text-[#292929]"
              }
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[280px] sm:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={20}
            margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E0E0E0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fill: "#686868", fontSize: 10 }}
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -5,
                style: {
                  textAnchor: "middle",
                  fill: "#292929",
                  fontSize: 12,
                },
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tick={{ fill: "#686868", fontSize: 11 }}
              label={{
                value: "Total Enquiries",
                angle: -90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fill: "#292929",
                  fontSize: 12,
                },
              }}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#F034B2"
              radius={[10, 10, 0, 0]}
              maxBarSize={40}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnquiriesGraph;