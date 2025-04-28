export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
} 