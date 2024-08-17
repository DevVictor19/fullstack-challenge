export class ContactResponseDto {
  id: number;
  client_id: number;
  user_id: number;
  name: string;
  email: string;
  phone_number: string;

  constructor(props: ContactResponseDto) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.client_id = props.client_id;
    this.name = props.name;
    this.email = props.email;
    this.phone_number = props.phone_number;
  }
}
