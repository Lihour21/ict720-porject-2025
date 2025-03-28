import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar  } from 'recharts'
import { motion } from 'framer-motion'
import FetchRawData from '../../utils/RestFetch'

const MyChart = ({ station, url }) => {

    const fetchData = <FetchRawData url={url}/>
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
    const stationData = ChartData.find((item) => item.name === station);

        // Function to determine color based on value
        const getColor = (value) => {
          if (value > 50) return '#8884d8'; // Purple
          if (value > 20) return '#82ca9d'; // Green
          return '#ff7300'; // Orange
        };
    var b = stationData.value;
    return (
        <motion.div
        className='bg-gray-800 bg-opacity-50 backdrop-blu-md overflow-hidden shadow-lg rounded-xl p-6 border border-gray-700'
        initial={{opacity: 1, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.3}}>
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                {station}
            </h2>
            <div className='h-80'>
                <ResponsiveContainer hight={"100%"} width={"100%"}>
                    <RadialBarChart 
                        width={730} 
                        height={250} 
                        innerRadius="50%" 
                        outerRadius="100%" 
                        data={stationData ? [stationData] : []}
                        startAngle={90} 
                        endAngle={-270}
                        >
                        
                        <RadialBar label={{ fill: '#8B5CF6', position: 'bottom' }} background={{fill: '#2e4053'}} clockWise={true} dataKey='value' fill="#8B5CF6" domain={[0, 100]}/>
                        {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}
                        <PolarAngleAxis orientation='inner' type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <Tooltip />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            <h2 className='text-lg font-medium mb-4 text-center text-gray-100'>
                Remaining Paper : {b}%
            </h2>
        </motion.div>
    )
}

export default MyChart