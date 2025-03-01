import csv
import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('investors.db')
cursor = conn.cursor()

# Create tables
cursor.execute('''
CREATE TABLE IF NOT EXISTS investors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    investor_name VARCHAR(100) NOT NULL,
    investor_type VARCHAR(100) NOT NULL,
    investor_country VARCHAR(100) NOT NULL,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    investor_last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS commitments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    investor_id INTEGER NOT NULL,
    commitment_asset_class VARCHAR(100) NOT NULL,
    commitment_amount INTEGER NOT NULL,
    commitment_currency VARCHAR(10) NOT NULL,
    FOREIGN KEY (investor_id) REFERENCES investors(id)
)
''')

# Read data from CSV file and insert into tables
with open('data.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Insert investor data
        cursor.execute('''
        INSERT INTO investors (investor_name, investor_type, investor_country, date_added, investor_last_updated)
        VALUES (?, ?, ?, ?, ?)
        ''', (row['Investor Name'], row['Investory Type'], row['Investor Country'], row['Investor Date Added'], row['Investor Last Updated']))

        investor_id = cursor.lastrowid
        cursor.execute('''
                       commit;
                       ''')

        # Insert commitment data
        cursor.execute('''
        INSERT INTO commitments (investor_id, commitment_asset_class, commitment_amount, commitment_currency)
        VALUES (?, ?, ?, ?)
        ''', (investor_id, row['Commitment Asset Class'], row['Commitment Amount'], row['Commitment Currency']))


# Commit changes and close connection
conn.commit()
conn.close()
