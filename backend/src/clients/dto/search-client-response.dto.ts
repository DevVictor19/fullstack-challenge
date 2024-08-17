import { ClientResponseDto } from './client-response.dto';

export class SearchClientResponseDto {
  data: ClientResponseDto[];
  total: number;
  page: number;
  lastPage: number;
}
