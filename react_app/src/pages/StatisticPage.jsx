import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const StatisticPage = () => {
    return (<div className='flex-1 overflow-auto relative z-10'>
        <Header title="Flor 2" />
        <main className='max-w-7x1 mx-auto py-6 px-4 lg:px-8'>
            <motion.div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
            initial={{ opacity: 0, y: 20}}
            animate={{ opacity: 1, y:0}}
            transition={{ duration: 1}}
            >
                <StatCard name="Total Station" icon={Zap} value='100' color='#6366F1' />
                <StatCard name="Fine" icon={Zap} value='51' color='#6366F1' />
                <StatCard name="Low" icon={Zap} value='39' color='#6366F1' />
                <StatCard name="Very Low" icon={Zap} value='10' color='#6366F1' />
            </motion.div>
        
        </main>
</div>
    
    
    );
};
export default StatisticPage;