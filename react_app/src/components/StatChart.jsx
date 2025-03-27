import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar  } from 'recharts'
import { motion } from 'framer-motion'

const ChartData = [
    { name: "station 1", value: 100},
    { name: "station 2", value: 80},
    { name: "station 3", value: 90},
    { name: "station 4", value: 60}
]

const StatChart = () => {
  return (
    <motion.div
        ckkassName='bg-gray-800 bg-opacity-50 backdrop-blu-md overflow-hidden shadow-lg rounded-2xl p-6 border border-gray-700'
        initial={{opacity: 1, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.2}}>
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                Statistic Chart
            </h2>
            
            <div className='h-80'>
                <ResponsiveContainer width={"100%"} hight={"100%"}>
                    <BarChart
                        width={500}
                        height={300}
                        data={ChartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                        barSize={20}
                        >
                        <CartesianGrid strokeDasharray='3 3' stoke='#4b5563'/>                
                        <XAxis dataKey={"name"} stroke='#4b5563'/>
                        <YAxis stroke='#9ca3af'/>
                        <Tooltip/>

                        <Bar dataKey="value"  fill="#8884d8" background={{ fill: "#eee", opacity:cd 0 }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
    </motion.div>
  )
}

export default StatChart
