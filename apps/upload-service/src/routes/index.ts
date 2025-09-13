import express from 'express';

import { Upload, Status } from '../controllers';

const router = express.Router();

router.post('/upload', Upload);
router.get('/status', Status);

export default router;
