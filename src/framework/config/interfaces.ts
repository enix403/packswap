export interface AppConfig {
  nodeEnv: string;
  // TODO: allow named pipes as bind target
  port: number;

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
