import { FindOneContactResponseDto } from './find-one-contact-response.dto';

export class SearchContactResponseDto {
  data: FindOneContactResponseDto[];
  total: number;
  page: number;
  lastPage: number;
}
