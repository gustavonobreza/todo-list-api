CREATE TABLE IF NOT EXISTS todo(
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
);