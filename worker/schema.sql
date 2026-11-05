CREATE TABLE IF NOT EXISTS shouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nick TEXT NOT NULL,
    text TEXT NOT NULL,
    ts INTEGER NOT NULL,
    ip_hash TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS shouts_ip_ts ON shouts (ip_hash, ts);

CREATE TABLE IF NOT EXISTS visits (
    day TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    hits INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (day, ip_hash)
);

CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nick TEXT NOT NULL,
    nick_lc TEXT NOT NULL,
    age INTEGER NOT NULL,
    contact TEXT NOT NULL,
    source TEXT NOT NULL,
    ideas TEXT NOT NULL,
    tg INTEGER NOT NULL,
    ip_hash TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    ts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS applications_nick ON applications (nick_lc);
CREATE INDEX IF NOT EXISTS applications_ip_ts ON applications (ip_hash, ts);

CREATE TABLE IF NOT EXISTS mc_samples (
    ts INTEGER PRIMARY KEY,
    online INTEGER NOT NULL,
    players INTEGER NOT NULL
);
