import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar  } from 'recharts'
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

const MyChart = ({ station }) => {
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


// const pieChart = ( {head} ) => {

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

//     return (
//         <motion.div
//             className='bg-gray-800 bg-opacity-50 backdrop-blu-md overflow-hidden shadow-lg rounded-2xl p-6 border border-gray-700'
//             initial={{opacity: 1, y: 20}}
//             animate={{opacity: 1, y: 0}}
//             transition={{delay: 0.2}}>
//                 <h2 className='text-lg font-medium mb-4 text-gray-100 text-center'>
//                     {head}
//                 </h2>
                
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

                            <Bar dataKey="value"  fill="#8884d8" background={{ fill: "#eee", opacity: 0 }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
//         </motion.div>
//     )
// }

// export default myPieChart

