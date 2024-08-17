export class ClientResponseDto {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  created_at: Date;

  constructor(props: ClientResponseDto) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.name = props.name;
    this.email = props.email;
    this.phone_number = props.phone_number;
    this.created_at = props.created_at;
  }
}
