import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";

const TaskInput = ({ onAddTask }) => {
const [taskText, setTaskText] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")
  const [isAdding, setIsAdding] = useState(false)
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)

const handleSubmit = async (e) => {
    e.preventDefault()
    if (!taskText.trim()) return

    setIsAdding(true)
    
    // Simulate brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 100))
    
    onAddTask({
      text: taskText.trim(),
      description: description.trim(),
      priority: priority
    })
    
    setTaskText("")
    setDescription("")
    setPriority("low")
    setIsAdding(false)
  }

  const handleGenerateDescription = async () => {
    if (!taskText.trim()) {
      return
    }

    setIsGeneratingDescription(true)
    
    try {
      const response = await fetch(`https://test-api.apper.io/fn/${import.meta.env.VITE_CLAUDE_DESCRIPTION_GENERATOR}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskText.trim() }),
      })

      const data = await response.json()
      
      if (data.success) {
        setDescription(data.description)
      } else {
        console.error('Failed to generate description:', data.error)
      }
    } catch (error) {
      console.error('Error generating description:', error)
    } finally {
      setIsGeneratingDescription(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <motion.div
    initial={{
        opacity: 0,
        y: -20
    }}
    animate={{
        opacity: 1,
        y: 0
    }}
    transition={{
        duration: 0.3
    }}
    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-card border border-white/50 p-6 mb-8">
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4">
            <div className="flex-1">
                <label
                    htmlFor="task-input"
                    className="block text-sm font-medium text-secondary-700 mb-2">What needs to be done?
                                </label>
                <Input
                    id="task-input"
                    type="text"
                    placeholder="Add a new task..."
                    value={taskText}
                    onChange={e => setTaskText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-base"
                    autoFocus />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <label
                        htmlFor="task-description"
                        className="block text-sm font-medium text-secondary-700">Description (optional)
                                      </label>
                    <Button
                        type="button"
                        onClick={handleGenerateDescription}
                        disabled={!taskText.trim() || isGeneratingDescription}
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 px-3">
                        {isGeneratingDescription ? <>
                            <ApperIcon name="Loader2" size={12} className="animate-spin mr-1" />Generating...
                                              </> : <>
                            <ApperIcon name="Sparkles" size={12} className="mr-1" />Generate Description
                                              </>}
                    </Button>
                </div>
                <textarea
                    id="task-description"
                    placeholder="Add a description or use AI to generate one..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full min-h-[80px] px-3 py-2 text-sm border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3} />
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 sm:max-w-[140px]">
                <label
                    htmlFor="priority-select"
                    className="block text-sm font-medium text-secondary-700 mb-2">Priority
                                  </label>
                <Select
                    id="priority-select"
                    value={priority}
                    onChange={e => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </Select>
            </div>
            <div className="flex items-end">
                <Button
                    type="submit"
                    disabled={!taskText.trim() || isAdding}
                    className="w-full sm:w-auto min-w-[120px] h-12">
                    {isAdding ? <motion.div
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                        }}>
                        <ApperIcon name="Loader2" size={16} />
                    </motion.div> : <>
                        <ApperIcon name="Plus" size={16} className="mr-2" />Add Task
                                          </>}
                </Button>
            </div>
        </div>
    </form>
</motion.div>
  )
}

export default TaskInput