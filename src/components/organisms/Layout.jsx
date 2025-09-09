import { motion } from "framer-motion"

const Layout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50"
    >
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-accent-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl" />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <main className="min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </motion.div>
  )
}

export default Layout