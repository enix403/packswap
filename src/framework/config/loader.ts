import { plainToInstance } from "class-transformer";
import { red } from "colorette";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isNumberString,
  validateSync
} from "class-validator";
import { AppConfig } from "./interfaces";

class EnvironmentVariables {
  // @IsEnum(Environment)
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  // PORT is a string as it may be a named pipe instead of a TCP port number
  @IsString()
  @IsNotEmpty()
  PORT: string | number;

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

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  SWAGGER_SITE_TITLE?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  SWAGGER_DOC_TITLE?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  SWAGGER_DOC_DESCRIPTION?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  SWAGGER_DOC_VERSION?: string;
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

  if (errors.length > 0) {
    // TOOD: use logging service
    console.log(red(errorMessage));
    throw new Error("Environment validation failed");
  }

  return validatedConfig;
}

// Loads the config from environment variables
export function loadAppConfig(): AppConfig {
  let env = process.env as unknown as EnvironmentVariables;

  let appPort: string | number  = env.PORT;

  if (isNumberString(appPort)) {
    appPort = +appPort;
  }

  return {
    nodeEnv: (env.NODE_ENV as any) || "development",
    port: appPort,
    database: {
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME
    },
    jwt: {
      secret: env.JWT_SECRET
    },
    swagger: {
      siteTitle: env.SWAGGER_SITE_TITLE ?? "API",
      docTitle: env.SWAGGER_DOC_TITLE ?? "API",
      docDescription: env.SWAGGER_DOC_DESCRIPTION ?? "API Specification",
      docVersion: env.SWAGGER_DOC_VERSION ?? "1.0"
    }
  };
}
