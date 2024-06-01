import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync
} from "class-validator";
import { AppConfig } from "./interfaces";

class EnvironmentVariables {
  // @IsEnum(Environment)
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  // TODO: allow named pipes as bind target
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  });

  let errorMessage = errors
    .map(error => {
      let allConstraints = error.constraints ?? {};
      let constraintsKeys = Object.keys(allConstraints);

      let message = constraintsKeys.length
        ? allConstraints[constraintsKeys[0]]
        : `Invalid value for env variable \"${error.property}\"`;

      return message;
    })
    .join("\n");

  // TODO: use a library
  const COLOR = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    fgRed: "\x1b[31m"
  };

  errorMessage = `${COLOR.fgRed}${COLOR.bright}${errorMessage}${COLOR.reset}`;

  if (errors.length > 0) {
    throw new Error(errorMessage);
  }

  return validatedConfig;
}

// Loads the config from environment variables
export function loadAppConfig(): AppConfig {
  return {
    nodeEnv: (process.env.NODE_ENV! as any) || "development",
    port: parseInt(process.env.PORT!, 10) || 3000,
    database: {
      host: process.env.DB_HOST! || "localhost",
      port: parseInt(process.env.DB_PORT!, 10) || 5432,
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      name: process.env.DB_NAME!
    },
    jwt: {
      secret: process.env.JWT_SECRET!
    }
  };
}
