import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';
import { ServiceVersion } from '../entities/service-version.entity';
import { SeedingService } from './seeding.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceVersion])],
  providers: [SeedingService],
  exports: [SeedingService],
})
export class SeedingModule {}
