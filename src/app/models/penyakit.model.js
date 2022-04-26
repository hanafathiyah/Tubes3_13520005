export default (sequelize, Sequelize) => {
  const Penyakit = sequelize.define("penyakit", {
    nama_penyakit: {
      type: Sequelize.STRING
    },
    rantai: {
      type: Sequelize.STRING
    }
  });
  return Penyakit;
};