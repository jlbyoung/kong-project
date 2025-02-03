import { Module } from '@nestjs/common';
import { ServicesService } from './services/services.service';
import { ServicesController } from './controllers/services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceVersion } from './entities/service-version.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Service, ServiceVersion],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class AppModule {}
