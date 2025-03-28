import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import StatChart from "../components/Charts/StatChart";
import RadialChart from "../components/Charts/RadialChart";
import TotalChart from "../components/Charts/TotalChart";

import { motion } from "framer-motion";
import { Cpu, Smile, Annoyed, TriangleAlert  } from "lucide-react";

const FloorFourPage = () => {
    return (<div className='flex-1 overflow-auto relative z-10'>
        <Header title="Floor 4" />
        <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8'>
            {/* StatCard */}
            <motion.div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-5'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y:0}}
            transition={{ duration: 1}}
            >
                <StatCard name="Total Station" icon={Cpu} floor="floor4" upper_ratio='101' lower_ratio='0' color='#3498db' />
                <StatCard name="Fine" icon={Smile} floor="floor4" upper_ratio='100' lower_ratio='50' color='#2ecc71' />
                <StatCard name="Low" icon={Annoyed} floor="floor4" upper_ratio='49' lower_ratio='20' color='#f7dc6f' />
                <StatCard name="Very Low" icon={TriangleAlert} floor="floor4" upper_ratio='19' lower_ratio='0' color='#e74c3c' />
            </motion.div>
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                Gauge
            </h2>
            {/* Gauge */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-flow-row gap-3 mb-5'>
                <RadialChart station = "Room 1" floor="floor4" room="room1" color="#0088FE"/>
                <RadialChart station = "Room 2" floor="floor4" room="room2" color="#00C49F"/>
                <RadialChart station = "Room 3" floor="floor4" room="room3" color="#FFBB28"/>
                <RadialChart station = "Room 4" floor="floor4" room="room4" color="#FF8042"/>
                <RadialChart station = "Room 5" floor="floor4" room="room5" color="#900C3F"/>
            </div>
            <h2 className='text-lg font-medium mb-4 text-gray-100'>
                Statistic
            </h2>
            {/* Charts */}
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-row gap-8'>
                <StatChart head="Monthly" floor="floor4"/>
                <TotalChart head="Paper used by Room" floor="floor4"/>
            </div>
        </main>
</div>
    
    
    );
};
export default FloorFourPage;