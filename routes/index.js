module.exports = (app) => {
  app.use("/api/v1/users", require("./users"));
  app.use("/api/v1/carts", require("./carts"));
};
