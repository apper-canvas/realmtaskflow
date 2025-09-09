import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import TaskInput from "@/components/molecules/TaskInput"
import FilterTabs from "@/components/molecules/FilterTabs"
import TaskStats from "@/components/molecules/TaskStats"
import TaskItem from "@/components/molecules/TaskItem"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { taskService } from "@/services/api/taskService"

const TaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")

  const loadTasks = async () => {
    try {
      setError(null)
      setLoading(true)
      const tasksData = await taskService.getAll()
      setTasks(tasksData)
    } catch (err) {
      setError("Failed to load tasks. Please try again.")
      console.error("Error loading tasks:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        completed: false,
        createdAt: new Date(),
        dueDate: null
      })
      
      setTasks(prevTasks => [newTask, ...prevTasks])
      toast.success("Task added successfully!", {
        icon: "🎉"
      })
    } catch (err) {
      toast.error("Failed to add task. Please try again.")
      console.error("Error adding task:", err)
    }
  }

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed
      })
      
      setTasks(prevTasks => 
        prevTasks.map(t => t.Id === taskId ? updatedTask : t)
      )
      
      if (updatedTask.completed) {
        toast.success("Task completed! Great job!", {
          icon: "✅"
        })
      } else {
        toast.info("Task reopened")
      }
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error toggling task:", err)
    }
  }

  const handleEditTask = async (taskId, updateData) => {
    try {
      const task = tasks.find(t => t.Id === taskId)
      const updatedTask = await taskService.update(taskId, {
        ...task,
        ...updateData
      })
      
      setTasks(prevTasks => 
        prevTasks.map(t => t.Id === taskId ? updatedTask : t)
      )
      
      toast.success("Task updated successfully!")
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Error updating task:", err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prevTasks => prevTasks.filter(t => t.Id !== taskId))
      toast.success("Task deleted", {
        icon: "🗑️"
      })
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Error deleting task:", err)
    }
  }

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case "active":
        return tasks.filter(task => !task.completed)
      case "completed":
        return tasks.filter(task => task.completed)
      default:
        return tasks
    }
  }

  const getTaskCounts = () => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const active = total - completed
    
    return { total, completed, active }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadTasks} />

  const filteredTasks = getFilteredTasks()
  const taskCounts = getTaskCounts()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 bg-clip-text text-transparent mb-4">
          TaskFlow
        </h1>
        <p className="text-lg text-secondary-600 font-medium">
          Organize your life, one task at a time
        </p>
      </motion.div>

      <TaskStats 
        totalTasks={taskCounts.total}
        completedTasks={taskCounts.completed}
        activeTasks={taskCounts.active}
      />

      <TaskInput onAddTask={handleAddTask} />

      {tasks.length > 0 && (
        <FilterTabs 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
        />
      )}

      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {filteredTasks.length === 0 ? (
            <Empty 
              message={
                activeFilter === "completed" 
                  ? "No completed tasks yet"
                  : activeFilter === "active"
                  ? "No active tasks"
                  : "No tasks yet"
              }
              description={
                activeFilter === "completed"
                  ? "Complete some tasks to see them here"
                  : activeFilter === "active" 
                  ? "All tasks are completed! Great work!"
                  : "Add your first task to get started"
              }
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.05 }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: -100, 
                      transition: { duration: 0.2 }
                    }}
                    layout
                    className="group"
                  >
                    <TaskItem
                      task={task}
                      onToggleComplete={handleToggleComplete}
                      onDeleteTask={handleDeleteTask}
                      onEditTask={handleEditTask}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TaskManager