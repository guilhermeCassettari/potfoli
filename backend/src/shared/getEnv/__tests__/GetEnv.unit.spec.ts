import AppError from '../../errors/AppError';
import { GetEnv } from '../GetEnv';

const originalEnv = process.env;

describe('GetEnv', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should get database type', () => {
    process.env.DATABASE_TYPE = 'postgres';
    const getEnv = GetEnv.getInstance();
    expect(getEnv.dbType).toBe('postgres');
  });

  it('should throw an error if the database type is missing', () => {
    delete process.env.DATABASE_TYPE;
    const env = GetEnv.getInstance();
    expect(() => env.dbType).toThrow(AppError);
    expect(() => env.dbType).toThrow('Database type not found');
  });

  it('should throw an error if the database type is invalid', () => {
    process.env.DATABASE_TYPE = 'sqlite';
    const env = GetEnv.getInstance();
    expect(() => env.dbType).toThrow(AppError);
    expect(() => env.dbType).toThrow('Database type not found');
  });

  it('should return the correct database host', () => {
    process.env.DATABASE_HOST = 'localhost';
    const env = GetEnv.getInstance();
    expect(env.dbHost).toBe('localhost');
  });

  it('should throw an error if the database host is missing', () => {
    delete process.env.DATABASE_HOST;
    const env = GetEnv.getInstance();
    expect(() => env.dbHost).toThrow(AppError);
    expect(() => env.dbHost).toThrow('Database host not found');
  });

  it('should return the correct database port', () => {
    process.env.DATABASE_PORT = '5432';
    const env = GetEnv.getInstance();
    expect(env.dbPort).toBe(5432);
  });

  it('should throw an error if the database port is missing', () => {
    delete process.env.DATABASE_PORT;
    const env = GetEnv.getInstance();
    expect(() => env.dbPort).toThrow(AppError);
    expect(() => env.dbPort).toThrow('Database port not found');
  });

  it('should return the correct database username', () => {
    process.env.DATABASE_USERNAME = 'postgres';
    const env = GetEnv.getInstance();
    expect(env.dbUserName).toBe('postgres');
  });

  it('should throw an error if the database username is missing', () => {
    delete process.env.DATABASE_USERNAME;
    const env = GetEnv.getInstance();
    expect(() => env.dbUserName).toThrow(AppError);
    expect(() => env.dbUserName).toThrow(
      'Database username not found',
    );
  });

  it('should return the correct database password', () => {
    process.env.DATABASE_PASSWORD = 'password';
    const env = GetEnv.getInstance();
    expect(env.dbPassword).toBe('password');
  });

  it('should throw an error if the database password is missing', () => {
    delete process.env.DATABASE_PASSWORD;
    const env = GetEnv.getInstance();
    expect(() => env.dbPassword).toThrow(AppError);
    expect(() => env.dbPassword).toThrow(
      'Database password not found',
    );
  });

  it('should return the correct database name', () => {
    process.env.DATABASE_NAME = 'testdb';
    const env = GetEnv.getInstance();
    expect(env.dbName).toBe('testdb');
  });

  it('should throw an error if the database name is missing', () => {
    delete process.env.DATABASE_NAME;
    const env = GetEnv.getInstance();
    expect(() => env.dbName).toThrow(AppError);
    expect(() => env.dbName).toThrow('Database name not found');
  });

  it('should return the correct backend port', () => {
    process.env.BACKEND_PORT = '3000';
    const env = GetEnv.getInstance();
    expect(env.backendPort).toBe(3000);
  });

  it('should throw an error if the backend port is missing', () => {
    delete process.env.BACKEND_PORT;
    const env = GetEnv.getInstance();
    expect(() => env.backendPort).toThrow(AppError);
    expect(() => env.backendPort).toThrow('Backend port not found');
  });
});
