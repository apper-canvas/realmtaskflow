import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const FilterTabs = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { 
      key: "all", 
      label: "All Tasks", 
      icon: "List",
      count: taskCounts.total,
      gradient: "from-secondary-600 to-secondary-500"
    },
    { 
      key: "active", 
      label: "Active", 
      icon: "Circle",
      count: taskCounts.active,
      gradient: "from-primary-600 to-primary-500"
    },
    { 
      key: "completed", 
      label: "Completed", 
      icon: "CheckCircle",
      count: taskCounts.completed,
      gradient: "from-success-600 to-success-500"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card border border-white/50 p-2 mb-6"
    >
      <div className="flex flex-col sm:flex-row gap-2">
        {filters.map((filter) => (
          <motion.div
            key={filter.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1"
          >
            <Button
              variant={activeFilter === filter.key ? "primary" : "ghost"}
              onClick={() => onFilterChange(filter.key)}
              className={cn(
                "w-full justify-between h-12 relative overflow-hidden",
                activeFilter === filter.key 
                  ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg` 
                  : "text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50"
              )}
            >
              <div className="flex items-center gap-2">
                <ApperIcon name={filter.icon} size={16} />
                <span className="font-medium">{filter.label}</span>
              </div>
              <motion.span 
                className={cn(
                  "inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-semibold",
                  activeFilter === filter.key
                    ? "bg-white/20 text-white"
                    : "bg-secondary-100 text-secondary-600"
                )}
                initial={false}
                animate={{ scale: filter.count > 0 ? 1 : 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {filter.count}
              </motion.span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default FilterTabs