module.exports = (sequelize) => {
  const { User, SelectionProcess, Application, Exam } = sequelize.models;

  // Usuário pode ter várias candidaturas
  User.hasMany(Application, { foreignKey: 'candidateId' });
  Application.belongsTo(User, { as: 'Candidate', foreignKey: 'candidateId' });

  // Processo pode ter várias candidaturas
  SelectionProcess.hasMany(Application, { foreignKey: 'processId' });
  Application.belongsTo(SelectionProcess, { foreignKey: 'processId' });

  // Recrutador pode criar vários processos
  User.hasMany(SelectionProcess, { foreignKey: 'recruiterId' });
  SelectionProcess.belongsTo(User, { as: 'Recruiter', foreignKey: 'recruiterId' });

  // Concursos podem ter vários processos vinculados
  Exam.hasMany(SelectionProcess, { foreignKey: 'examId' });
  SelectionProcess.belongsTo(Exam, { foreignKey: 'examId' });
};