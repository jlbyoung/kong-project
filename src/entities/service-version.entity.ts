import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class ServiceVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  releasedAt: Date;

  @ManyToOne(() => Service, (service) => service.versions)
  service: Service;
}
