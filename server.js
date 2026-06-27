const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname));

const usersDatabase = [
    { name: "Ahmed", email: "test@gmail.com", password: "123456" }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'auth.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    const userExists = usersDatabase.find(user => user.email === email);
    if (userExists) {
        return res.json({ success: false, message: "This email is already registered!" });
    }

    usersDatabase.push({ name, email, password });
    res.json({ success: true, message: `Account created successfully, ${name}! You can log in now.` , redirect: "/dashboard"});
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = usersDatabase.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ success: true, message: `Login successful! Welcome back, ${user.name} 🚀`, redirect: "/dashboard" });
    } else {
        res.json({ success: false, message: "the password or email is incorrect!" });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});