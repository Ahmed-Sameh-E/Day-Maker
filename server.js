const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

app.use(express.json());
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.use(
  session({
    secret: "my-super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

const noCache = (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private",
  );
  next();
};

const usersDatabase = [
  { name: "Ahmed", email: "test@gmail.com", password: "123456" },
];

app.get("/", noCache, (req, res) => {
  if (req.session.user) {
    return res.redirect("/dashboard");
  }
  res.sendFile(path.join(__dirname, "auth.html"));
});

app.get("/dashboard", noCache, (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  const userExists = usersDatabase.find((user) => user.email === email);
  if (userExists) {
    return res.json({
      success: false,
      message: "This email is already registered!",
    });
  }

  const newUser = { name, email, password };
  usersDatabase.push(newUser);

  req.session.user = { name: newUser.name, email: newUser.email };

  res.json({
    success: true,
    message: `Account created successfully!`,
    redirect: "/dashboard",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = usersDatabase.find(
    (u) => u.email === email && u.password === password,
  );

  if (user) {
    req.session.user = { name: user.name, email: user.email };

    res.json({
      success: true,
      name: user.name,
      message: "Login successful!",
      redirect: "/dashboard",
    });
  } else {
    res.json({
      success: false,
      message: "the password or email is incorrect!",
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});