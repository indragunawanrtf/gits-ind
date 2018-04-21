const PORT = 3000;

module.exports = app => {
  app.listen(PORT, () => {
    console.log(`Server is Running PORT ${PORT}`);
  });
}