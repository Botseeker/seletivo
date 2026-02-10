const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const processController = require('../controllers/processController');

// Apenas recrutadores e admin
router.post('/', authenticate, authorize(['admin', 'recruiter']), processController.createProcess);
router.get('/', authenticate, processController.getProcesses);
router.get('/:id', authenticate, processController.getProcessById);
router.put('/:id', authenticate, authorize(['admin', 'recrutador']), processController.updateProcess);
router.delete('/:id', authenticate, authorize(['admin']), processController.deleteProcess);

// Candidatos podem ver processos abertos
router.get('/public/open', processController.getOpenProcesses);

module.exports = router;