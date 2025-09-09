import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"

const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("")
  const [priority, setPriority] = useState("low")
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!taskText.trim()) return

    setIsAdding(true)
    
    // Simulate brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 100))
    
    onAddTask({
      text: taskText.trim(),
      priority: priority
    })
    
    setTaskText("")
    setPriority("low")
    setIsAdding(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card border border-white/50 p-6 mb-8"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex-1">
            <label htmlFor="task-input" className="block text-sm font-medium text-secondary-700 mb-2">
              What needs to be done?
            </label>
            <Input
              id="task-input"
              type="text"
              placeholder="Add a new task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="text-base"
              autoFocus
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 sm:max-w-[140px]">
              <label htmlFor="priority-select" className="block text-sm font-medium text-secondary-700 mb-2">
                Priority
              </label>
              <Select
                id="priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button
                type="submit"
                disabled={!taskText.trim() || isAdding}
                className="w-full sm:w-auto min-w-[120px] h-12"
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ApperIcon name="Loader2" size={16} />
                  </motion.div>
                ) : (
                  <>
                    <ApperIcon name="Plus" size={16} className="mr-2" />
                    Add Task
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default TaskInput