// Import necessary modules and dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helper = require("./utils/helper");
const { sequelize } = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure the session settings
const sess = {
  secret: "Super Secret Secret",
  cookie: {
    maxAge: 3600000, // Session will last for an hour
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ defaultLayout: "main" });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Define special headers for JavaScript files in the "public" directory
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);

app.use(routes); // Added this line to include all routes

// Synchronize the Sequelize database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`now listening on port: ${PORT}`));
});
