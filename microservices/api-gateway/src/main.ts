import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function apiGateway() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  await app.listen(3000);
}
apiGateway();
