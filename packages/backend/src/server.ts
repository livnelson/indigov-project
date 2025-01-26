const express = require('express')
const app = express()

// API Endpoint
import { Request, Response } from 'express'

app.get('/api/constituents', (req: Request, res: Response) => {
  const constituents = [
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
  res.json(constituents)
})

// Start Server
app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001')
})
