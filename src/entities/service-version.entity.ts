import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class ServiceVersion {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  version: string;

  @ManyToOne(() => Service, (service) => service.versions)
  service: Service;
}
