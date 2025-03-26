import type { NextApiRequest, NextApiResponse } from 'next'

type ContactFormData = {
  name: string
  email: string
  message: string
}

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const data = req.body as ContactFormData

 
  if (!data.name || !data.email || !data.message) {
    return res.status(400).json({ message: 'All fields are required' })
  }

 
  console.log('Form submission:', data)

  
  setTimeout(() => {
    res.status(200).json({ message: 'Message sent successfully' })
  }, 1000)
} 