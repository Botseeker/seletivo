module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'under_review', 'approved', 'rejected', 'hired'),
      defaultValue: 'pending'
    },
    score: DataTypes.FLOAT,
    notes: DataTypes.TEXT,
    documents: DataTypes.JSONB // Links para documentos
  });

  return Application;
};