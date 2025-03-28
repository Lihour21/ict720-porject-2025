import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import StatChart from "../components/Charts/StatChart";
import RadialChart from "../components/Charts/RadialChart";
import TotalChart from "../components/Charts/TotalChart";
import FetchRawData from "../utils/RestFetch";
import { motion } from "framer-motion";
import { Cpu, Smile, Annoyed, TriangleAlert  } from "lucide-react";

const FloorOnePage = () => {
    const data = [{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T11:20:04.084000","tsi":15.693642026421074},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T11:20:03.086000","tsi":41.155775866017144},{"floor":"floor1","room":"room3","rst":1,"timestamp":"2025-03-29T11:20:02.207000","tsi":100.0},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T11:20:01.413000","tsi":83.44017524083151},{"floor":"floor1","room":"room1","rst":1,"timestamp":"2025-03-29T11:20:00.614000","tsi":100.0},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T10:00:03.143000","tsi":7.45607412015139},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T10:00:02.525000","tsi":86.34051723724926},{"floor":"floor1","room":"room3","rst":0,"timestamp":"2025-03-29T10:00:01.737000","tsi":86.43994737061372},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T10:00:01.674000","tsi":31.691568668790794},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T10:00:00.958000","tsi":98.41661108228892},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T09:00:03.541000","tsi":34.15166333040393},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T09:00:02.716000","tsi":35.54732030018093},{"floor":"floor1","room":"room3","rst":0,"timestamp":"2025-03-29T09:00:02.292000","tsi":4.771213444953171},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T09:00:01.506000","tsi":22.724253705571794},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T09:00:00.828000","tsi":17.25421458005343},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T08:20:02.816000","tsi":62.0634836854803},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T08:20:02.156000","tsi":10.241159199676531},{"floor":"floor1","room":"room3","rst":1,"timestamp":"2025-03-29T08:20:01.573000","tsi":100.0},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T08:20:00.887000","tsi":75.02253098000747},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T08:20:00.159000","tsi":43.15147381802663},{"floor":"floor1","room":"room5","rst":0,"timestamp":"2025-03-29T08:00:02.405000","tsi":67.9213415523951},{"floor":"floor1","room":"room4","rst":0,"timestamp":"2025-03-29T08:00:02.137000","tsi":32.716774819507165},{"floor":"floor1","room":"room3","rst":0,"timestamp":"2025-03-29T08:00:01.731000","tsi":92.89849723006036},{"floor":"floor1","room":"room2","rst":0,"timestamp":"2025-03-29T08:00:00.835000","tsi":40.511219824974084},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-29T08:00:00.608000","tsi":27.136767055076138},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:56.572654","tsi":0},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:51.889006","tsi":71.1764705882353},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:49.001073","tsi":0},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:45.174389","tsi":27.64705882352942},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:42.298852","tsi":82.94117647058823},{"floor":"floor1","room":"room1","rst":0,"timestamp":"2025-03-28T16:31:40.369760","tsi":92.94117647058823}]
    return (
            <div className='flex-1 overflow-auto relative z-10'>
            <Header title="Floor 1" />
            <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8'>
                {/* StatCard */}
                <motion.div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5'
                initial={{ opacity: 0, y: 20}}
                animate={{ opacity: 1, y:0}}
                transition={{ duration: 1}}
                >
                    <StatCard name="Total Station" icon={Cpu} floor="floor1" upper_ratio='101' lower_ratio='0' color='#3498db' />
                    <StatCard name="Fine" icon={Smile} floor="floor1" upper_ratio='100' lower_ratio='50' color='#2ecc71' />
                    <StatCard name="Low" icon={Annoyed} floor="floor1" upper_ratio='49' lower_ratio='20' color='#f7dc6f' />
                    <StatCard name="Very Low" icon={TriangleAlert} floor="floor1" upper_ratio='19' lower_ratio='0' color='#e74c3c' />
                </motion.div>
                <h2 className='text-lg font-medium mb-4 text-gray-100'>
                    Gauge
                </h2>
                {/* Gauge */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-flow-row gap-3 mb-5'>
                    <RadialChart station = "Room 1" floor="floor1" room="room1" color="#0088FE"/>
                    <RadialChart station = "Room 2" floor="floor1" room="room2" color="#00C49F"/>
                    <RadialChart station = "Room 3" floor="floor1" room="room3" color="#FFBB28"/>
                    <RadialChart station = "Room 4" floor="floor1" room="room4" color="#FF8042"/>
                    <RadialChart station = "Room 5" floor="floor1" room="room5" color="#900C3F"/>
                </div>
                <h2 className='text-lg font-medium mb-4 text-gray-100'>
                    Statistic
                </h2>
                {/* Charts */}
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-row gap-8'>
                    <StatChart head="Monthly" floor="floor1"/>
                    <TotalChart head="Paper used by Room" floor="floor1"/>
                </div>
            </main>
    </div>
    )
};
export default FloorOnePage;