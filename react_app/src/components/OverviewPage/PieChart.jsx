import React from 'react'
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, PolarAngleAxis, Legend  } from 'recharts'
import { motion } from 'framer-motion'

const ChartData = [
    { name: "station 1", value: 95},
    { name: "station 2", value: 80},
    { name: "station 3", value: 90},
    { name: "station 4", value: 60},
    { name: "station 5", value: 70}
]
const PieChart = ({ station }) => {
    const stationData = ChartData.find((item) => item.name === station);

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
                        {/* <RadialBar
                            background
                            dataKey="value"
                            cornerRadius={30 / 2}
                            fill="#0BEFF2"
                        /> */}
                        <RadialBar label={{ fill: '#8B5CF6', position: 'insideStart' }} background={{fill: '#2e4053'}} clockWise={true} dataKey='value' fill="#8B5CF6" domain={[0, 100]}/>
                        <PolarAngleAxis orientation='inner' type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <Tooltip />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}

export default PieChart
