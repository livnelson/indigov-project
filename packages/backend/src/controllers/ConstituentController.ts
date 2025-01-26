import { Request, Response } from 'express'
import pool from '../database'
import { Parser } from 'json2csv'

// Get a list of all Constituents
export const getAllConstituents = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM constituents ORDER BY created_at DESC'
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching constituents', error })
  }
}

// Get a List of New Constituents from this week
export const getNewConstituents = async (req: Request, res: Response) => {
  try {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const result = await pool.query(
      'SELECT * FROM constituents WHERE created_at >= $1 ORDER BY created_at DESC',
      [oneWeekAgo]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching new constituents', error })
  }
}

// Create a new Constituent
export const createConstituent = async (req: Request, res: Response) => {
  const { name, email, address } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO constituents (name, email, address) VALUES ($1, $2, $3) ON CONFLICT (email) DO UPDATE SET address = $3 RETURNING *',
      [name, email, address]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Error creating constituent', error })
  }
}

// Export a CSV List of Constituents
export const exportConstituents = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM constituents ORDER BY created_at DESC'
    )
    const json2csv = new Parser()
    const csv = json2csv.parse(result.rows)

    res.header('Content-Type', 'text/csv')
    res.attachment('constituents.csv')
    res.send(csv)
  } catch (error) {
    res.status(500).json({ message: 'Error exporting constituents', error })
  }
}

// Delete a Constituent 
export const  deleteConstituent = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  try {
    const result = await pool.query(
      'DELETE FROM constituents WHERE id = $1 RETURNING *',
      [id]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Error deleting constituent', error })
  }
}