import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import TaskListPage from "@/components/pages/TaskListPage"

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskListPage />} />
        </Routes>
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  )
}

export default App