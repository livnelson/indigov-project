import { useState, useEffect } from 'react'
import { FaSort, FaSortUp, FaSortDown, FaTrash } from 'react-icons/fa'
import '../styles/allConstituents.css'

// Interface for a constituent's data
interface Constituent {
  id: number
  name: string
  email: string
  signupDate: string
}

// Interface for a message's data
interface Message {
  id: number
  content: string
}

// Mock data for constituents (for example purposes)
export const mockConstituents = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main St',
    signupDate: '2024-01-25T19:42:04.820Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    address: '456 Oak St, Albany, NY',
    signupDate: '2024-09-25T21:59:11.587Z',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    address: '789 Pine Ave, Denver, CO',
    signupDate: '2024-03-25T21:59:11.587Z',
  },
  {
    id: 4,
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    address: '321 Maple Dr, Austin, TX',
    signupDate: '2023-07-25T21:59:11.587Z',
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    address: '654 Cedar Ln, Portland, OR',
    signupDate: '2025-01-25T21:59:11.587Z',
  },
]

// Mock data for messages (for example purposes)
const mockMessages = [
  { id: 2, constituent_id: 2, content: 'What are the office hours?' },
  { id: 3, constituent_id: 3, content: 'When is the next town hall?' },
  { id: 4, constituent_id: 4, content: 'I have a question about zoning.' },
  { id: 5, constituent_id: 5, content: 'Thank you for your response!' },
]

const AllConstituents = () => {
  const [constituents, setConstituents] = useState<Constituent[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortField, setSortField] = useState<keyof Constituent | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedConstituent, setSelectedConstituent] =
    useState<Constituent | null>(null)

  // Fetches the list of constituents (uses mock data or real API depending on the flag)
  const fetchConstituents = async () => {
    setIsLoading(true)
    setError('')

    try {
      const useMockData = true // Toggle this to use mock data or real API
      const data = useMockData
        ? await new Promise<Constituent[]>((resolve) => {
            setTimeout(() => resolve(mockConstituents), 300) // Simulate a delay
          })
        : await (async () => {
            const response = await fetch('/api/constituents')
            if (!response.ok) {
              throw new Error('Failed to fetch constituents.')
            }
            return response.json()
          })()

      setConstituents(data)
    } catch (err: any) {
      // Handle fetch errors
      setError(err.message || 'An error occurred while fetching constituents.')
      console.error('Fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetches messages for a selected constituent
  const fetchMessages = async (constituentId: number) => {
    setSelectedConstituent(
      constituents.find((c) => c.id === constituentId) || null
    )
    setIsLoading(true) // Show loading while fetching messages
    setMessages([])

    try {
      // Simulate fetching messages for a constituent
      const mockFetch = () =>
        new Promise<Message[]>((resolve) => {
          setTimeout(() => {
            const filteredMessages = mockMessages.filter(
              (message) => message.constituent_id === constituentId
            )
            resolve(filteredMessages)
          }, 300) // Simulate a delay
        })

      const data = await mockFetch()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  // Sort constituents based on the selected field (e.g., name or signupDate)
  const handleSort = (field: keyof Constituent) => {
    const newSortOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(newSortOrder)

    const sortedConstituents = [...constituents].sort((a, b) => {
      if (a[field] < b[field]) return newSortOrder === 'asc' ? -1 : 1
      if (a[field] > b[field]) return newSortOrder === 'asc' ? 1 : -1
      return 0
    })

    setConstituents(sortedConstituents)
  }

  // Filters constituents based on the search query (by name or email)
  const filteredConstituents = constituents.filter(
    (constituent) =>
      constituent.name.toLowerCase().includes(searchQuery) ||
      constituent.email.toLowerCase().includes(searchQuery)
  )

  // Deletes a constituent
  const handleDeleteConstituent = (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this constituent?'
    )
    if (confirmed) {
      setConstituents(
        constituents.filter((constituent) => constituent.id !== id)
      )
    }
  }

  // Fetch constituents on initial load
  useEffect(() => {
    fetchConstituents()
  }, [])

  return (
    <div className='constituents-container'>
      <h1 className='heading'>All Constituents</h1>

      {/* Display error message if any */}
      {error && <div className='error-message'>{error}</div>}

      {/* Search Bar and Sorting Controls */}
      <div className='controls-container'>
        <input
          type='text'
          className='search-input'
          placeholder='Search by name or email...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        <div className='sort-buttons'>
          {/* Sort by Name */}
          <button
            className='btn-primary'
            onClick={() => handleSort('name')}
          >
            Sort by Name{' '}
            {sortField === 'name' ? (
              sortOrder === 'asc' ? (
                <FaSortUp />
              ) : (
                <FaSortDown />
              )
            ) : (
              <FaSort />
            )}
          </button>

          {/* Sort by Signup Date */}
          <button
            className='btn-primary'
            onClick={() => handleSort('signupDate')}
          >
            Sort by Signup Date{' '}
            {sortField === 'signupDate' ? (
              sortOrder === 'asc' ? (
                <FaSortUp />
              ) : (
                <FaSortDown />
              )
            ) : (
              <FaSort />
            )}
          </button>

          {/* Add New Button */}
          <button
            className='btn-primary'
            onClick={() => alert('Feature coming soon!')}
          >
            Add New
          </button>
          {/* Export Constituents Button */}
          <button
            className='btn-primary'
            onClick={() => window.open('/api/constituents/export', '_blank')}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Constituent Table */}
      <div className='constituent-list'>
        <table className='constituents-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Signup Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConstituents.map((constituent) => (
              <tr key={constituent.id}>
                <td>{constituent.name}</td>
                <td>{constituent.email}</td>
                <td>{new Date(constituent.signupDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className='btn-secondary'
                    onClick={() => fetchMessages(constituent.id)}
                  >
                    View Messages
                  </button>
                  <FaTrash
                    className='delete-icon'
                    onClick={() => handleDeleteConstituent(constituent.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Constituents Message */}
      {!isLoading && filteredConstituents.length === 0 && !error && (
        <p>No constituents available.</p>
      )}

      {/* Messages Section */}
      {selectedConstituent && (
        <div className='messages-container'>
          <div className='messages-header'>
            <h2>Messages from {selectedConstituent.name}</h2>

            {/* Only show the Reply/Send Message button when messages are loaded */}
            {!isLoading && messages.length > 0 && (
              <button
                className='btn-primary'
                onClick={() => alert('Feature coming soon')}
              >
                Reply
              </button>
            )}

            {/* Show Send Message button when no messages are found */}
            {!isLoading && messages.length === 0 && (
              <button
                className='btn-primary'
                onClick={() =>
                  alert(
                    'Send a message to this constituent - Feature coming soon'
                  )
                }
              >
                Send Message
              </button>
            )}
          </div>

          {/* Show loading state when messages are being fetched */}
          {isLoading ? (
            <p>Loading messages...</p>
          ) : messages.length > 0 ? (
            <ul>
              {messages.map((message) => (
                <li key={message.id}>{message.content}</li>
              ))}
            </ul>
          ) : (
            <p>No messages found for this constituent.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default AllConstituents
