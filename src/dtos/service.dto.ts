export class ServiceFilterDto {
  name?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export class ServiceResponseDto {
  id: string;
  name: string;
  description: string;
  versionsCount: number;
  versions?: ServiceVersionResponseDto[];
}

export class ServiceVersionResponseDto {
  id: string;
  version: string;
}

export class CreateServiceDto {
  name: string;
  description: string;
}
