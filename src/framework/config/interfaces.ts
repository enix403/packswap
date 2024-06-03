export interface AppConfig {
  nodeEnv: string;
  port: number | string;

  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };

  jwt: {
    secret: string
  };

  swagger: {
    siteTitle: string;
    docTitle: string;
    docDescription: string;
    docVersion: string;
  }
}
