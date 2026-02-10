const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const sequelize = require('./src/models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const authRoutes = require('./src/routes/auth');
const processRoutes = require('./src/routes/processes');
const applicationRoutes = require('./src/routes/applications');
const examRoutes = require('./src/routes/exams');

app.use('/api/auth', authRoutes);
app.use('/api/processes', processRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/exams', examRoutes);

// Upload de arquivos estáticos
app.use('/uploads', express.static('uploads'));

// Sincronizar banco e iniciar servidor
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco:', err);
});