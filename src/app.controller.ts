import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  public index() {
    return {
      message: "Welcome to HerbiMed API"
    };
  }
}
