import api from "@/lib/axios";
import { API_ENDPOINT } from "@/enums/api-endpoints.enum";
import { ILoginUserDto, ILoginUserResponseDto, ISignupUserDto } from "./dtos";

export async function loginUser(
  dto: ILoginUserDto
): Promise<ILoginUserResponseDto> {
  const { data } = await api.post(API_ENDPOINT.LOGIN, dto);
  return data;
}

export async function signupUser(dto: ISignupUserDto): Promise<void> {
  await api.post(API_ENDPOINT.SIGNUP, dto);
}
