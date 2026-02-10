module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: DataTypes.STRING,
    examCode: {
      type: DataTypes.STRING,
      unique: true
    },
    noticeNumber: DataTypes.STRING,
    organization: DataTypes.STRING,
    noticeFile: DataTypes.STRING,
    positions: DataTypes.JSONB,
    phases: DataTypes.JSONB,
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Exam;
};