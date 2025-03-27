import { BarChart2, DollarSign, Settings, Menu } from "lucide-react";
import { useState } from 'react';
import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
    {
        name:"Overview", icon: BarChart2, color: "#6366f1", path: "/",
    },
    {
        name:"Statistic", icon: DollarSign, color: "#8B5CF6", href: "/statistic"
    }
]
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <motion.div 
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
            isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{ width: isSidebarOpen ? 256 : 80}}
    >
        <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col'>
        <motion.button
            whileHover={{ scale: 1.1}}
            whileTap={{ scale: 0.9}}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'>
            <Menu size={24}/>
        </motion.button>
        </div>
    </motion.div>
  );
};

export default Sidebar;
