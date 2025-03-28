import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import StatChart from "../components/OverviewPage/StatChart";
import PieChart from "../components/OverviewPage/PieChart";

import { motion } from "framer-motion";
import { Cpu, Smile, Annoyed, TriangleAlert  } from "lucide-react";

const OverviewPage = () => {
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
                    <StatCard name="Total Station" icon={Cpu} value='100' color='#3498db' />
                    <StatCard name="Fine" icon={Smile} value='51' color='#2ecc71' />
                    <StatCard name="Low" icon={Annoyed} value='39' color='#f7dc6f' />
                    <StatCard name="Very Low" icon={TriangleAlert} value='10' color='#e74c3c' />
                </motion.div>
                <h2 className='text-lg font-medium mb-4 text-gray-100'>
                    Gauge
                </h2>
                {/* Gauge */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-flow-row gap-3 mb-5'>
                    <PieChart station = "station 1"/>
                    <PieChart station = "station 2"/>
                    <PieChart station = "station 3"/>
                    <PieChart station = "station 4"/>
                    <PieChart station = "station 5"/>
                </div>
                <h2 className='text-lg font-medium mb-4 text-gray-100'>
                    Statistic
                </h2>
                {/* Charts */}
                <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-row gap-8'>
                    <StatChart head="Monthly"/>
                    <StatChart head="Daily"/>
                </div>

                
            
            </main>
    </div>
    )
};
export default OverviewPage;