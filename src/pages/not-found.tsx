import DashboardButton from "../components/ui/dashboard-button"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-violet-300 via-violet-600 to-indigo-900 space-y-4">
      <h1 className="text-4xl font-bold text-white">Error 404 - Page not found</h1>
      <p className="text-lg text-white/80 mb-15">The page you are looking for doesn't exist.</p>
      <DashboardButton buttonText="Go back to dashboard" />
    </div>
  )
}

export default NotFoundPage