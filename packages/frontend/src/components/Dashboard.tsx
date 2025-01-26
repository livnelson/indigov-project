import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div className='dashboard-container'>
      <h1 className='heading'>Dashboard</h1>

      {/* Quick Stats Section */}
      <div className='quick-stats'>
        <div className='stat-card'>
          <h2>Total Constituents</h2>
          <p>500</p>
        </div>
        <div className='stat-card'>
          <h2>New Constituents This Week</h2>
          <p>10</p>
        </div>
        <div className='stat-card'>
          <h2>Unanswered Messages</h2>
          <p>5</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='dashboard-actions'>
        <button
          className='btn-primary'
          onClick={() => navigate('/constituents')}
        >
          View All Constituents
        </button>
      </div>
    </div>
  )
}

export default Dashboard
