import { RequestMethod, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 3000
  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('api/v1', { exclude: ['/:code'] })
  await app.listen(port)
}
bootstrap()
