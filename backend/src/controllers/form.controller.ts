import { Request, Response } from 'express';
import { query } from '../db';
import { FormData, ApiResponse } from '../types';

export const submitForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message }: FormData = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields',
      } as ApiResponse);
    }

    const result = await query(
      'INSERT INTO form_submissions (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
    } as ApiResponse);
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    } as ApiResponse);
  }
};

export const getSubmissions = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM form_submissions ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: result.rows,
    } as ApiResponse);
  } catch (error) {
    console.error('Error getting submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    } as ApiResponse);
  }
}; 