const USERS = [{ username: 'admin', password: 'secret', token: 'admin-token' }];

export function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  const user = USERS.find((u) => `Bearer ${u.token}` === token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  next();
}

export function login(req, res) {
  const { username, password } = req.body;
  const user = USERS.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: user.token });
}

