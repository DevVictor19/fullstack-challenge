import { ContactResponseDto } from './contact-response.dto';

export class SearchContactResponseDto {
  data: ContactResponseDto[];
  total: number;
  page: number;
  lastPage: number;
}
