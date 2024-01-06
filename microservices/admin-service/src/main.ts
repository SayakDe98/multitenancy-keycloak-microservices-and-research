import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Response } from 'express';
const logger = new Logger();
async function adminService() {
 
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: 8888
    }
  });
  app.listen().then((res: Response) => logger.log("Admin Microservice is listening"));
}
adminService();
