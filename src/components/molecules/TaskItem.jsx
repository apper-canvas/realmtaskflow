import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim() && editText.trim() !== task.text) {
        onEditTask(task.Id, {
          text: editText.trim(),
          priority: editPriority
        })
      } else if (!editText.trim()) {
        setEditText(task.text)
        setEditPriority(task.priority)
      }
    }
    setIsEditing(!isEditing)
  }

  const handleCancel = () => {
    setEditText(task.text)
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await new Promise(resolve => setTimeout(resolve, 200))
    onDeleteTask(task.Id)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEdit()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high"
      case "medium":
        return "priority-medium"
      case "low":
        return "priority-low"
      default:
        return "priority-low"
    }
  }

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-gradient-to-r from-error-100 to-error-50 text-error-700 border-error-200",
      medium: "bg-gradient-to-r from-warning-100 to-warning-50 text-warning-700 border-warning-200", 
      low: "bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 border-primary-200"
    }
    
    return (
      <span className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border capitalize",
        colors[priority]
      )}>
        <span className={cn("priority-dot", getPriorityColor(priority))} />
        {priority}
      </span>
    )
  }

  if (isDeleting) {
    return (
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white/60 backdrop-blur-sm rounded-xl shadow-card border border-white/30 p-4"
      >
        <div className="flex items-center justify-center py-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <ApperIcon name="Loader2" size={20} className="text-secondary-400" />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: task.completed ? 0.7 : 1, 
        y: 0,
        scale: task.completed ? 0.98 : 1
      }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      whileHover={{ 
        y: task.completed ? 0 : -2,
        transition: { duration: 0.15 }
      }}
      className={cn(
        "bg-white/90 backdrop-blur-sm rounded-xl shadow-card border border-white/50 p-4 transition-all duration-200",
        "hover:shadow-card-hover hover:border-white/70",
        task.completed && "bg-gradient-to-r from-secondary-50/80 to-secondary-100/60"
      )}
    >
      <div className="flex items-start gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleComplete(task.Id)}
          className="task-checkbox mt-1 flex-shrink-0"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        />
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-sm"
                autoFocus
              />
              <Select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="text-sm"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <p 
                className={cn(
                  "text-sm font-medium leading-relaxed transition-all duration-200",
                  task.completed 
                    ? "line-through text-secondary-500" 
                    : "text-secondary-800"
                )}
              >
                {task.text}
              </p>
              {getPriorityBadge(task.priority)}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-1"
              >
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleEdit}
                  className="h-8 w-8 p-0"
                  aria-label="Save changes"
                >
                  <ApperIcon name="Check" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="h-8 w-8 p-0 text-secondary-500 hover:text-secondary-700"
                  aria-label="Cancel editing"
                >
                  <ApperIcon name="X" size={14} />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-1"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 p-0 text-secondary-500 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Edit task"
                >
                  <ApperIcon name="Edit2" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDelete}
                  className="h-8 w-8 p-0 text-secondary-500 hover:text-error-600"
                  aria-label="Delete task"
                >
                  <ApperIcon name="Trash2" size={14} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem