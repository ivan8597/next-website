import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import formRoutes from './routes/form.routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const host = 'localhost';

// Расширенная конфигурация CORS
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: '*'
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Базовый маршрут
app.get('/', (req, res) => {
  res.json({ message: 'API работает' });
});

// Маршруты формы
app.use('/api/form', formRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(port, host, () => {
  console.log(`Сервер запущен на http://${host}:${port}`);
});