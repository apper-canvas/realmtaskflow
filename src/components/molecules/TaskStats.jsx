import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const TaskStats = ({ totalTasks, completedTasks, activeTasks }) => {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "List",
      gradient: "from-secondary-600 to-secondary-500",
      bgGradient: "from-secondary-50 to-secondary-100/50"
    },
    {
      label: "Active",
      value: activeTasks,
      icon: "Circle",
      gradient: "from-primary-600 to-primary-500",
      bgGradient: "from-primary-50 to-primary-100/50"
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "CheckCircle",
      gradient: "from-success-600 to-success-500",
      bgGradient: "from-success-50 to-success-100/50"
    },
    {
      label: "Progress",
      value: `${completionRate}%`,
      icon: "TrendingUp",
      gradient: "from-accent-600 to-accent-500",
      bgGradient: "from-accent-50 to-accent-100/50"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-card hover:shadow-card-hover transition-all duration-200`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg`}>
              <ApperIcon name={stat.icon} size={16} className="text-white" />
            </div>
            <motion.div
              key={stat.value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-right"
            >
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
            </motion.div>
          </div>
          <p className="text-sm font-medium text-secondary-600">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default TaskStats