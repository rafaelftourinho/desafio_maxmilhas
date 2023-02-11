import mysql from 'mysql2/promise';
import { UserPersistence } from '../../src/infrastructure/persistence/UserPersistence';

jest.mock('mysql2/promise');

describe('Database Connection Pool', () => {
  it('creates a connection pool with the correct parameters', () => {
    expect(mysql.createPool).toHaveBeenCalledWith({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });
  });

  it('exports the connection pool', () => {
    expect(UserPersistence).toBeDefined();
  });
});
