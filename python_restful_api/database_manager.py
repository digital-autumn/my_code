import sqlite3
import datetime
import time


class DatabaseManager:
    def __init__(self):
        self.query = None
        self.c = None
        self.conn = None
        self.create_database()

    # creates database and widgets table
    def create_database(self):
        self.conn = self.open_conn()
        self.c = self.conn.cursor()
        self.query = """CREATE TABLE IF NOT EXISTS widgets(
                id VARCHAR(64) PRIMARY KEY,
                name TEXT NOT NULL,
                num_of_parts INTEGER NOT NULL,
                created_date TEXT NOT NULL,
                modified_date TEXT
            )"""

        try:
            self.c.execute(self.query)
            self.conn.commit()
            self.conn.close()

        except sqlite3.Error as e:
            print(f'Error creating database: {e}')

    # opens connections to database
    def open_conn(self):
        return sqlite3.connect("widgets.db")

    # returns formatted date and time
    def date_formatted(self):
        self.unix = time.time()
        return str(datetime.datetime.fromtimestamp(self.unix)
                   .strftime('%Y-%m-%d %H:%M:%S'))
