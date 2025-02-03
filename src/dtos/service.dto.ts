export class ServiceFilterDto {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export class ServiceResponseDto {
  id: string;
  name: string;
  description: string;
  versionsCount: number;
}
