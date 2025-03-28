import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cell, Tooltip, ResponsiveContainer, PieChart, Pie} from 'recharts'
import { motion } from 'framer-motion'
import FetchRawData from "../../utils/RestFetch";

const TotalChart = ( {head, floor} ) => {

    const fetchedData = [{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T11:20:04.084000","tsi":15.693642026421074},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T11:20:03.086000","tsi":41.155775866017144},{"floor":"floor1","room":"room3","rst":1,"timestamp":"2025-03-29T11:20:02.207000","tsi":100.0},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T11:20:01.413000","tsi":83.44017524083151},{"floor":"floor1","room":"room1","rst":1,"timestamp":"2025-03-29T11:20:00.614000","tsi":100.0},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T10:00:03.143000","tsi":7.45607412015139},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T10:00:02.525000","tsi":86.34051723724926},{"floor":"floor1","room":"room3","rst":0,"timestamp":"2025-03-29T10:00:01.737000","tsi":86.43994737061372},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T10:00:01.674000","tsi":31.691568668790794},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T10:00:00.958000","tsi":98.41661108228892},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T09:00:03.541000","tsi":34.15166333040393},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T09:00:02.716000","tsi":35.54732030018093},{"floor":"floor1","room":"room3","rst":0,"timestamp":"2025-03-29T09:00:02.292000","tsi":4.771213444953171},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T09:00:01.506000","tsi":22.724253705571794},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T09:00:00.828000","tsi":17.25421458005343},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T08:20:02.816000","tsi":62.0634836854803},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T08:20:02.156000","tsi":10.241159199676531},{"floor":"floor1","room":"room3","rst":1,"timestamp":"2025-03-29T08:20:01.573000","tsi":100.0},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T08:20:00.887000","tsi":75.02253098000747},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T08:20:00.159000","tsi":43.15147381802663},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T08:00:02.405000","tsi":67.9213415523951},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T08:00:02.137000","tsi":32.716774819507165},{"floor":"floor1","room":"room3","rst":0,"timestamp":"2025-03-29T08:00:01.731000","tsi":92.89849723006036},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T08:00:00.835000","tsi":40.511219824974084},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T08:00:00.608000","tsi":27.136767055076138},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:56.572654","tsi":0},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:51.889006","tsi":71.1764705882353},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:49.001073","tsi":0},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:45.174389","tsi":27.64705882352942},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:42.298852","tsi":82.94117647058823},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:40.369760","tsi":92.94117647058823},
        {"floor":"floor2","room":"room5","rst":0,"timestamp":"2025-03-29T11:20:06.325000","tsi":73.2711624630978},{"floor":"floor2","room":"room4","rst":0,"timestamp":"2025-03-29T11:20:05.972000","tsi":26.16806329312833},{"floor":"floor2","room":"room3","rst":0,"timestamp":"2025-03-29T11:20:05.295000","tsi":94.2539812916302},{"floor":"floor2","room":"room2","rst":0,"timestamp":"2025-03-29T11:20:04.753000","tsi":93.76827760931722},{"floor":"floor2","room":"room1","rst":0,"timestamp":"2025-03-29T11:20:04.118000","tsi":3.3136036527122714},{"floor":"floor2","room":"room5","rst":0,"timestamp":"2025-03-29T10:00:06.561000","tsi":85.9184306071189},{"floor":"floor2","room":"room4","rst":0,"timestamp":"2025-03-29T10:00:06.291000","tsi":25.78164329042012},{"floor":"floor2","room":"room3","rst":0,"timestamp":"2025-03-29T10:00:05.356000","tsi":65.18685343225164},{"floor":"floor2","room":"room2","rst":0,"timestamp":"2025-03-29T10:00:04.411000","tsi":29.2682270787612},{"floor":"floor2","room":"room1","rst":0,"timestamp":"2025-03-29T10:00:04.091000","tsi":63.06932215001716},{"floor":"floor2","room":"room5","rst":1,"timestamp":"2025-03-29T09:00:05.529000","tsi":100.0},{"floor":"floor2","room":"room4","rst":0,"timestamp":"2025-03-29T09:00:05.523000","tsi":30.37300240675369},{"floor":"floor2","room":"room3","rst":0,"timestamp":"2025-03-29T09:00:04.911000","tsi":84.73684839950593},{"floor":"floor2","room":"room2","rst":0,"timestamp":"2025-03-29T09:00:04.417000","tsi":7.303599254565929},{"floor":"floor2","room":"room1","rst":1,"timestamp":"2025-03-29T09:00:04.191000","tsi":100.0},{"floor":"floor2","room":"room5","rst":1,"timestamp":"2025-03-29T08:20:04.086000","tsi":100.0},{"floor":"floor2","room":"room4","rst":0,"timestamp":"2025-03-29T08:20:04.068000","tsi":72.3171047487857},{"floor":"floor2","room":"room3","rst":1,"timestamp":"2025-03-29T08:20:03.816000","tsi":100.0},{"floor":"floor2","room":"room2","rst":0,"timestamp":"2025-03-29T08:20:03.197000","tsi":8.404770752831926},{"floor":"floor2","room":"room1","rst":0,"timestamp":"2025-03-29T08:20:02.963000","tsi":64.30629445144595},{"floor":"floor2","room":"room5","rst":0,"timestamp":"2025-03-29T08:00:04.607000","tsi":89.17061984849846},{"floor":"floor2","room":"room4","rst":1,"timestamp":"2025-03-29T08:00:03.660000","tsi":100.0},{"floor":"floor2","room":"room3","rst":0,"timestamp":"2025-03-29T08:00:03.393000","tsi":15.90240615891818},{"floor":"floor2","room":"room2","rst":0,"timestamp":"2025-03-29T08:00:02.982000","tsi":25.780427691635943},{"floor":"floor2","room":"room1","rst":0,"timestamp":"2025-03-29T08:00:02.420000","tsi":2.5693936655042604},
        {"floor":"floor3","room":"room5","rst":1,"timestamp":"2025-03-29T11:20:08.586000","tsi":100.0},{"floor":"floor3","room":"room4","rst":0,"timestamp":"2025-03-29T11:20:08.423000","tsi":64.41046213649396},{"floor":"floor3","room":"room3","rst":1,"timestamp":"2025-03-29T11:20:07.496000","tsi":100.0},{"floor":"floor3","room":"room2","rst":0,"timestamp":"2025-03-29T11:20:06.810000","tsi":10.308911373248652},{"floor":"floor3","room":"room1","rst":0,"timestamp":"2025-03-29T11:20:06.534000","tsi":16.458678006347117},{"floor":"floor3","room":"room5","rst":0,"timestamp":"2025-03-29T10:00:08.792000","tsi":61.75514585936111},{"floor":"floor3","room":"room4","rst":0,"timestamp":"2025-03-29T10:00:08.165000","tsi":33.16157861678466},{"floor":"floor3","room":"room3","rst":0,"timestamp":"2025-03-29T10:00:08.049000","tsi":17.23557196240668},{"floor":"floor3","room":"room2","rst":0,"timestamp":"2025-03-29T10:00:07.057000","tsi":47.8533992348113},{"floor":"floor3","room":"room1","rst":0,"timestamp":"2025-03-29T10:00:06.581000","tsi":91.71222232683739},{"floor":"floor3","room":"room5","rst":0,"timestamp":"2025-03-29T09:00:07.960000","tsi":49.84039633469571},{"floor":"floor3","room":"room4","rst":0,"timestamp":"2025-03-29T09:00:07.412000","tsi":29.863987007122372},{"floor":"floor3","room":"room3","rst":0,"timestamp":"2025-03-29T09:00:07.266000","tsi":61.78887408398887},{"floor":"floor3","room":"room2","rst":1,"timestamp":"2025-03-29T09:00:06.777000","tsi":100.0},{"floor":"floor3","room":"room1","rst":0,"timestamp":"2025-03-29T09:00:05.906000","tsi":33.34194103002331},{"floor":"floor3","room":"room5","rst":0,"timestamp":"2025-03-29T08:20:07.518000","tsi":64.04138520468257},{"floor":"floor3","room":"room4","rst":0,"timestamp":"2025-03-29T08:20:06.665000","tsi":89.72131091647849},{"floor":"floor3","room":"room3","rst":0,"timestamp":"2025-03-29T08:20:05.919000","tsi":72.35497342865321},{"floor":"floor3","room":"room2","rst":0,"timestamp":"2025-03-29T08:20:05.655000","tsi":23.889462291661424},{"floor":"floor3","room":"room1","rst":1,"timestamp":"2025-03-29T08:20:04.989000","tsi":100.0},{"floor":"floor3","room":"room5","rst":0,"timestamp":"2025-03-29T08:00:07.005000","tsi":66.57275171004254},{"floor":"floor3","room":"room4","rst":0,"timestamp":"2025-03-29T08:00:06.120000","tsi":66.67464871419611},{"floor":"floor3","room":"room3","rst":0,"timestamp":"2025-03-29T08:00:05.917000","tsi":94.60137955547282},{"floor":"floor3","room":"room2","rst":0,"timestamp":"2025-03-29T08:00:05.775000","tsi":24.621680030125724},{"floor":"floor3","room":"room1","rst":0,"timestamp":"2025-03-29T08:00:04.861000","tsi":17.08116890788708},
        {"floor":"floor4","room":"room5","rst":0,"timestamp":"2025-03-29T11:20:11.801000","tsi":18.922404656286616},{"floor":"floor4","room":"room4","rst":0,"timestamp":"2025-03-29T11:20:11.533000","tsi":94.73780866081519},{"floor":"floor4","room":"room3","rst":0,"timestamp":"2025-03-29T11:20:11.196000","tsi":72.23368404750502},{"floor":"floor4","room":"room2","rst":0,"timestamp":"2025-03-29T11:20:10.361000","tsi":71.10682739481155},{"floor":"floor4","room":"room1","rst":1,"timestamp":"2025-03-29T11:20:09.381000","tsi":100.0},{"floor":"floor4","room":"room5","rst":1,"timestamp":"2025-03-29T10:00:12.774000","tsi":100.0},{"floor":"floor4","room":"room4","rst":1,"timestamp":"2025-03-29T10:00:12.243000","tsi":100.0},{"floor":"floor4","room":"room3","rst":0,"timestamp":"2025-03-29T10:00:11.673000","tsi":42.45695397201275},{"floor":"floor4","room":"room2","rst":0,"timestamp":"2025-03-29T10:00:10.738000","tsi":54.22109067658217},{"floor":"floor4","room":"room1","rst":0,"timestamp":"2025-03-29T10:00:09.751000","tsi":51.56315509913354},{"floor":"floor4","room":"room5","rst":0,"timestamp":"2025-03-29T09:00:10.446000","tsi":97.49495035446175},{"floor":"floor4","room":"room4","rst":1,"timestamp":"2025-03-29T09:00:09.638000","tsi":100.0},{"floor":"floor4","room":"room3","rst":0,"timestamp":"2025-03-29T09:00:09.303000","tsi":12.661490162004297},{"floor":"floor4","room":"room2","rst":0,"timestamp":"2025-03-29T09:00:08.714000","tsi":33.50696793134503},{"floor":"floor4","room":"room1","rst":0,"timestamp":"2025-03-29T09:00:08.169000","tsi":26.811942300676282},{"floor":"floor4","room":"room5","rst":0,"timestamp":"2025-03-29T08:20:09.001000","tsi":11.296620022488412},{"floor":"floor4","room":"room4","rst":0,"timestamp":"2025-03-29T08:20:08.610000","tsi":31.21068092319037},{"floor":"floor4","room":"room3","rst":0,"timestamp":"2025-03-29T08:20:08.016000","tsi":26.705269717621626},{"floor":"floor4","room":"room2","rst":1,"timestamp":"2025-03-29T08:20:07.615000","tsi":100.0},{"floor":"floor4","room":"room1","rst":0,"timestamp":"2025-03-29T08:20:07.532000","tsi":37.88363881925923},{"floor":"floor4","room":"room5","rst":0,"timestamp":"2025-03-29T08:00:08.815000","tsi":86.0395000962924},{"floor":"floor4","room":"room4","rst":0,"timestamp":"2025-03-29T08:00:08.581000","tsi":69.48477125829764},{"floor":"floor4","room":"room3","rst":0,"timestamp":"2025-03-29T08:00:08.086000","tsi":1.6412613412612465},{"floor":"floor4","room":"room2","rst":1,"timestamp":"2025-03-29T08:00:07.385000","tsi":100.0},{"floor":"floor4","room":"room1","rst":1,"timestamp":"2025-03-29T08:00:07.181000","tsi":100.0},
        {"floor":"floor5","room":"room5","rst":0,"timestamp":"2025-03-29T11:20:14.498000","tsi":91.29899318456151},{"floor":"floor5","room":"room4","rst":0,"timestamp":"2025-03-29T11:20:14.112000","tsi":22.129699542414784},{"floor":"floor5","room":"room3","rst":0,"timestamp":"2025-03-29T11:20:13.512000","tsi":38.840564510387544},{"floor":"floor5","room":"room2","rst":0,"timestamp":"2025-03-29T11:20:12.842000","tsi":67.43849692425621},{"floor":"floor5","room":"room1","rst":0,"timestamp":"2025-03-29T11:20:12.134000","tsi":65.45789618037317},{"floor":"floor5","room":"room5","rst":0,"timestamp":"2025-03-29T10:00:15.250000","tsi":49.32790177204305},{"floor":"floor5","room":"room4","rst":0,"timestamp":"2025-03-29T10:00:14.710000","tsi":42.12906851952402},{"floor":"floor5","room":"room3","rst":0,"timestamp":"2025-03-29T10:00:14.018000","tsi":59.63471128818679},{"floor":"floor5","room":"room2","rst":0,"timestamp":"2025-03-29T10:00:13.276000","tsi":63.1841668835589},{"floor":"floor5","room":"room1","rst":0,"timestamp":"2025-03-29T10:00:12.997000","tsi":6.033819787897232},{"floor":"floor5","room":"room5","rst":0,"timestamp":"2025-03-29T09:00:12.251000","tsi":88.81346743771246},{"floor":"floor5","room":"room4","rst":0,"timestamp":"2025-03-29T09:00:11.709000","tsi":35.616144751249976},{"floor":"floor5","room":"room3","rst":0,"timestamp":"2025-03-29T09:00:11.433000","tsi":69.94645568766423},{"floor":"floor5","room":"room2","rst":0,"timestamp":"2025-03-29T09:00:10.972000","tsi":19.582867361431923},{"floor":"floor5","room":"room1","rst":0,"timestamp":"2025-03-29T09:00:10.655000","tsi":38.46695216115772},{"floor":"floor5","room":"room5","rst":0,"timestamp":"2025-03-29T08:20:12.036000","tsi":41.029942517386466},{"floor":"floor5","room":"room4","rst":0,"timestamp":"2025-03-29T08:20:11.055000","tsi":68.02381688137434},{"floor":"floor5","room":"room3","rst":0,"timestamp":"2025-03-29T08:20:10.310000","tsi":79.08840703255578},{"floor":"floor5","room":"room2","rst":1,"timestamp":"2025-03-29T08:20:09.965000","tsi":100.0},{"floor":"floor5","room":"room1","rst":0,"timestamp":"2025-03-29T08:20:09.763000","tsi":74.20927252350414},{"floor":"floor5","room":"room5","rst":0,"timestamp":"2025-03-29T08:00:11.522000","tsi":56.95218471896729},{"floor":"floor5","room":"room4","rst":0,"timestamp":"2025-03-29T08:00:11.346000","tsi":73.87519923830219},{"floor":"floor5","room":"room3","rst":0,"timestamp":"2025-03-29T08:00:10.752000","tsi":50.02457028780503},{"floor":"floor5","room":"room2","rst":0,"timestamp":"2025-03-29T08:00:10.304000","tsi":29.098378503482714},{"floor":"floor5","room":"room1","rst":0,"timestamp":"2025-03-29T08:00:09.703000","tsi":91.32348786062015}
    ]

    const floorData = fetchedData.filter(item => item.floor === floor);

    const pieChartData = [
        { "room": "room1", value: 95},
        { "room": "room1", value: 95},
        { "room": "room1", value: 95},
        { "room": "room1", value: 95},
        { "room": "room2", value: 80},
        { "room": "room2", value: 80},
        { "room": "room2", value: 80},
        { "room": "room2", value: 80},
        { "room": "room3", value: 90},
        { "room": "room3", value: 90},
        { "room": "room3", value: 90},
        { "room": "room3", value: 90},
        { "room": "room3", value: 90},
        { "room": "room3", value: 90},
        { "room": "room4", value: 60},
        { "room": "room4", value: 60},
        { "room": "room5", value: 70},
        { "room": "room5", value: 70},
        { "room": "room5", value: 70}
    ]
    
    const countOne = floorData.filter(item => item.room === "room1").length;
    const countTwo = floorData.filter(item => item.room === "room2").length;
    const countThree = floorData.filter(item => item.room === "room3").length;
    const countFour = floorData.filter(item => item.room === "room4").length;
    const countFive = floorData.filter(item => item.room === "room5").length;

    const countedData =[
        { name: "Room 1", value: countOne},
        { name: "Room 2", value: countTwo},
        { name: "Room 3", value: countThree},
        { name: "Room 4", value: countFour},
        { name: "Room 5", value: countFive}
    ]
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#900C3F'];

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
