module.exports = (sequelize, DataTypes) => {
  const SelectionProcess = sequelize.define('SelectionProcess', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM('draft', 'open', 'closed', 'finished'),
      defaultValue: 'draft'
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    maxCandidates: DataTypes.INTEGER,
    requirements: DataTypes.JSONB,
    stages: DataTypes.JSONB // Array de etapas
  });

  return SelectionProcess;
};