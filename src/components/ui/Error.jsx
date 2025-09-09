import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-elevated border border-error-200/50 p-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className="w-16 h-16 bg-gradient-to-r from-error-500 to-error-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <ApperIcon name="AlertTriangle" size={28} className="text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-secondary-800 mb-3">
            Oops! Something went wrong
          </h2>
          
          <p className="text-secondary-600 mb-8 max-w-md mx-auto leading-relaxed">
            {message}
          </p>
          
          {onRetry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={onRetry}
                className="inline-flex items-center gap-2"
              >
                <ApperIcon name="RefreshCw" size={16} />
                Try Again
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Error