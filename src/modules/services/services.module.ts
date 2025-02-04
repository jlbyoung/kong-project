import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service } from 'src/entities/service.entity';
import { ServiceVersion } from 'src/entities/service-version.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceVersion])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
