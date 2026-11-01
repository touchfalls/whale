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
