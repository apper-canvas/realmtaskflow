import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  message = "No items found",
  description = "Get started by adding your first item",
  icon = "List"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-card border border-white/50 p-12"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
          className="w-20 h-20 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name={icon} size={32} className="text-secondary-500" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-secondary-700 mb-2">
          {message}
        </h3>
        
        <p className="text-secondary-500 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-2 text-sm text-secondary-400">
            <ApperIcon name="ArrowUp" size={16} />
            <span>Add a task above to get started</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Empty