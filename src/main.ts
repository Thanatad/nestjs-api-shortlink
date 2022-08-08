import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix(`api/${process.env.API_CURRENT_VERSION}`, { exclude: ['/:code'] });
  await app.listen(port)
}
bootstrap()
