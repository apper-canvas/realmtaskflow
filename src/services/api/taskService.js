import tasksData from "@/services/mockData/tasks.json"

// Simulate API delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.tasks = [...tasksData]
  }

async getAll() {
    await delay(300)
    return [...this.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

async getById(id) {
    await delay(200)
    const task = this.tasks.find(task => task.Id === id)
    if (!task) {
      throw new Error(`Task with Id ${id} not found`)
    }
    return { ...task }
  }

async create(taskData) {
    await delay(250)
    
    const newId = Math.max(...this.tasks.map(t => t.Id), 0) + 1
    const newTask = {
      Id: newId,
      text: taskData.text,
      description: taskData.description || "",
      completed: taskData.completed || false,
      priority: taskData.priority || "low",
      createdAt: taskData.createdAt || new Date().toISOString(),
      dueDate: taskData.dueDate || null
    }
    
    this.tasks.push(newTask)
    return { ...newTask }
  }
async update(id, updateData) {
    await delay(200)
    
    const taskIndex = this.tasks.findIndex(task => task.Id === id)
    if (taskIndex === -1) {
      throw new Error(`Task with Id ${id} not found`)
    }
    
    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updateData }
    return { ...this.tasks[taskIndex] }
  }

  async delete(id) {
    await delay(300)
    
    const taskIndex = this.tasks.findIndex(task => task.Id === id)
    if (taskIndex === -1) {
      throw new Error(`Task with Id ${id} not found`)
    }
    
    this.tasks.splice(taskIndex, 1)
    return true
  }
}

export const taskService = new TaskService()