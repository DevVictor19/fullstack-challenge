import { FindOneClientResponseDto } from './find-one-client-response.dto';

export class SearchClientResponseDto {
  data: FindOneClientResponseDto[];
  total: number;
  page: number;
  lastPage: number;
}
