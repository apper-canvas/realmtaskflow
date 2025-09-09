import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header skeleton */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ pulse: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-12 bg-gradient-to-r from-secondary-200 to-secondary-300 rounded-xl mx-auto mb-4"
          style={{ width: "280px" }}
        />
        <div className="h-6 bg-secondary-200 rounded-lg mx-auto" style={{ width: "320px" }} />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-card"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-secondary-200 rounded-lg" />
              <div className="w-12 h-8 bg-secondary-200 rounded" />
            </div>
            <div className="w-20 h-4 bg-secondary-200 rounded" />
          </motion.div>
        ))}
      </div>

      {/* Task input skeleton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-card border border-white/50 p-6 mb-8"
      >
        <div className="space-y-4">
          <div>
            <div className="w-48 h-4 bg-secondary-200 rounded mb-2" />
            <div className="w-full h-12 bg-secondary-200 rounded-lg" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 sm:max-w-[140px]">
              <div className="w-16 h-4 bg-secondary-200 rounded mb-2" />
              <div className="w-full h-12 bg-secondary-200 rounded-lg" />
            </div>
            <div className="flex items-end">
              <div className="w-[120px] h-12 bg-secondary-200 rounded-lg" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Loading indicator */}
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mb-4"
        >
          <ApperIcon name="Loader2" size={32} className="text-primary-500" />
        </motion.div>
        <h3 className="text-lg font-semibold text-secondary-700 mb-2">
          Loading your tasks...
        </h3>
        <p className="text-secondary-500">
          Just a moment while we fetch your data
        </p>
      </div>
    </div>
  )
}

export default Loading