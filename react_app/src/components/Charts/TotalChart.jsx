import React from 'react'
import { Cell, Tooltip, ResponsiveContainer, PieChart, Pie} from 'recharts'
import { motion } from 'framer-motion'

const pieChartData = [
    { name: "Room 1", value: 95},
    { name: "Room 1", value: 95},
    { name: "Room 1", value: 95},
    { name: "Room 1", value: 95},
    { name: "Room 2", value: 80},
    { name: "Room 2", value: 80},
    { name: "Room 2", value: 80},
    { name: "Room 2", value: 80},
    { name: "Room 3", value: 90},
    { name: "Room 3", value: 90},
    { name: "Room 3", value: 90},
    { name: "Room 3", value: 90},
    { name: "Room 3", value: 90},
    { name: "Room 3", value: 90},
    { name: "Room 4", value: 60},
    { name: "Room 4", value: 60},
    { name: "Room 5", value: 70},
    { name: "Room 5", value: 70},
    { name: "Room 5", value: 70}
]

const TotalChart = ( {head} ) => {
    const countOne = pieChartData.filter(item => item.name === "Room 1").length;
    const countTwo = pieChartData.filter(item => item.name === "Room 2").length;
    const countThree = pieChartData.filter(item => item.name === "Room 3").length;
    const countFour = pieChartData.filter(item => item.name === "Room 4").length;
    const countFive = pieChartData.filter(item => item.name === "Room 5").length;

    const countedData =[
        { name: "Room 1", value: countOne},
        { name: "Room 2", value: countTwo},
        { name: "Room 3", value: countThree},
        { name: "Room 4", value: countFour},
        { name: "Room 5", value: countFive}
    ]
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4b5563'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
        );
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
      
        return (
          <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
              {payload.name}
            </text>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 6}
              outerRadius={outerRadius + 10}
              fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
              {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
          </g>
        );
    };

    return (
        
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-blu-md overflow-hidden shadow-lg rounded-2xl p-6 border border-gray-700'
            initial={{opacity: 1, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2}}>
                <h2 className='text-lg font-medium mb-4 text-gray-100 text-center'>
                    {head}
                </h2>
                
                <div className='h-80'>
                    <ResponsiveContainer width={"100%"} hight={"100%"}>
                        <PieChart width={730} height={250}>
                            <Pie data={countedData} 
                                labelLine={false}
                                label={renderCustomizedLabel} 
                                dataKey="value" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={50} 
                                outerRadius={120} 
                                >
                            {countedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
        </motion.div>
    )
}

export default TotalChart
