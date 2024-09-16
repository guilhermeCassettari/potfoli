import dotenv from "dotenv";
import path from "path";
import AppError from "../backend/src/shared/errors/AppError";

dotenv.config({
  path: path.resolve(__dirname, "..", "..", "..", "..", ".env"),
});

export class GetEnv {
  private static instance: GetEnv;
  public static getInstance() {
    if (!GetEnv.instance) {
      GetEnv.instance = new GetEnv();
    }
    return GetEnv.instance;
  }
  get dbType(): "postgres" | "mysql" {
    if (!process.env.DATABASE_TYPE) {
      throw new AppError("Database type not found", 500);
    }

    if (
      process.env.DATABASE_TYPE !== "postgres" &&
      process.env.DATABASE_TYPE !== "mysql"
    ) {
      throw new AppError("Database type not found", 500);
    }

    return process.env.DATABASE_TYPE;
  }
  get dbHost(): string {
    if (!process.env.DATABASE_HOST) {
      throw new AppError("Database host not found", 500);
    }
    return process.env.DATABASE_HOST;
  }

  get dbPort(): number {
    if (!process.env.DATABASE_PORT) {
      throw new AppError("Database port not found", 500);
    }
    return Number(process.env.DATABASE_PORT);
  }

  get dbUserName(): string {
    if (!process.env.DATABASE_USERNAME) {
      throw new AppError("Database username not found", 500);
    }
    return process.env.DATABASE_USERNAME;
  }

  get dbPassword(): string {
    if (!process.env.DATABASE_PASSWORD) {
      throw new AppError("Database password not found", 500);
    }
    return process.env.DATABASE_PASSWORD;
  }

  get dbName(): string {
    if (!process.env.DATABASE_NAME) {
      throw new AppError("Database name not found", 500);
    }
    return process.env.DATABASE_NAME;
  }

  get backendPort(): number {
    if (!process.env.BACKEND_PORT) {
      throw new AppError("Backend port not found", 500);
    }
    return Number(process.env.BACKEND_PORT);
  }

  get jwtSecret(): string {
    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT secret not found", 500);
    }
    return process.env.JWT_SECRET;
  }
}
