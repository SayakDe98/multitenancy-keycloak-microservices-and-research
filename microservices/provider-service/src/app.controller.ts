
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { AppService } from "./app.service";
import { CreatePropertyDto } from "./dto/property.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'ping' })
  ping(_: any) {
    return of(this.appService.getHello()).pipe(delay(1000));
    // return of("pong").pipe(delay(1000));
  }

  @MessagePattern({ cmd: 'create-property' })
  async createProperty(@Payload() payload: CreatePropertyDto) {
    return of(await this.appService.create(payload));
  }

  @MessagePattern({ cmd: 'get-properties' })
  async getProperties() {
    return of(await this.appService.findAll());
  }
}