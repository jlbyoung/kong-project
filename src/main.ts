import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedingService } from './database/seeding.service';
import { ServicesService } from './modules/services/services.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running`);

  const servicesService = app.get(ServicesService);
  const [, total] = await servicesService.findAll({ limit: 1 });
  if (total === 0) {
    console.log('Seeded DB!');
    const seedingService = app.get(SeedingService);
    await seedingService.seedData();
  }
}

bootstrap();
