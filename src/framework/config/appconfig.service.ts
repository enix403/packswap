import { Injectable } from "@nestjs/common";

import { AppConfig } from "./interfaces";
import { loadAppConfig } from "./loader";

@Injectable()
export class AppConfigService {
  private appConfig: AppConfig;

  constructor() {
    this.appConfig = loadAppConfig();
    Object.freeze(this.appConfig);
  }

  get c(): DeepReadonly<AppConfig> {
    return this.appConfig;
  }
}

/* ================== */

type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};
