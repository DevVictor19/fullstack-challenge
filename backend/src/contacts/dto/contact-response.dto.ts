export class ContactResponseDto {
  id: number;
  client_id: number;
  name: string;
  email: string;
  phone_number: string;

  constructor(props: ContactResponseDto) {
    this.id = props.id;
    this.client_id = props.client_id;
    this.name = props.name;
    this.email = props.email;
    this.phone_number = props.phone_number;
  }
}
