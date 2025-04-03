import { Router, RequestHandler } from 'express';
import { submitForm, getSubmissions } from '../controllers/form.controller';

const router = Router();

router.post('/submit', submitForm as RequestHandler);
router.get('/submissions', getSubmissions as RequestHandler);

export default router; 