const path = require("path");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const db = require("./util/database");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

/* db.execute("SELECT * FROM products")
  .then((data) => console.log(data))
  // .then((data) => console.log(data[0][0]))
  .catch((err) => console.log(err));
 */
app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
//db.end(); to end up the connection when application shutsdown

// Defining relationships
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync({force: true}) -- dont set the force option in production
  .sync({ force: true })
  .then(() => {
    app.listen(3000, () => console.log("Listening on 3000"));
  })
  .catch((err) => console.log(err));
