import os
import uuid
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import execute_batch

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

class Database:
    

    @staticmethod
    async def generate_id() -> str:
        return str(uuid.uuid4())

    @staticmethod
    async def write_to_db(query: str, params: list, batch: bool = False) -> list:
        conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT)
        cur = conn.cursor()
        try:
            execute_batch(cur, query, params) if batch else cur.execute(query, params)
            result = cur.fetchall() if not cur.description is None else None
            conn.commit()
        except:
            conn.rollback()
            result = None
        finally:
            cur.close()
            conn.close()
        return result

    @staticmethod
    async def read_from_db(query: str, params: tuple) -> list:
        conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT)
        cur = conn.cursor()
        cur.execute(query, params)
        result = cur.fetchall() if not cur.description is None else None
        cur.close()
        conn.close()

        print(result)
        return result
