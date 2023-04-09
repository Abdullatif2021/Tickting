export interface ApiInterface {
  success: boolean;
  message: string;
  data: any;
  responseCode: number;
}
export interface TicketInterface {
  name: string;
  surname: string;
  phone: string;
  email: string;
  message: string;
  group_id: number;
  problem_area: String;
  description: String;
  link: String;

}
