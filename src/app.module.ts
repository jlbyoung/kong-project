import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceVersion } from './entities/service-version.entity';
import { SeedingModule } from './database/seeding.module';
import { ServicesModule } from './modules/services/services.module';

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
    SeedingModule,
    ServicesModule,
  ],
})
export class AppModule {}
