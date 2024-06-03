import { plainToInstance } from "class-transformer";
import { red } from "colorette";
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
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
  @IsNumberString()
  @IsNotEmpty()
  PORT: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsNumberString()
  @IsNotEmpty()
  DB_PORT: string;

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
  return {
    nodeEnv: (env.NODE_ENV as any) || "development",
    port: parseInt(env.PORT, 10) || 3000,
    database: {
      host: env.DB_HOST || "localhost",
      port: parseInt(env.DB_PORT, 10) || 5432,
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
