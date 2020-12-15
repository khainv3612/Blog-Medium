import {PostPayload} from '../add-post/post-payload';

export class AccountDetails {
  id?: number;
  username: string;
  email: string;
  image?: string;
  description?: string;
  address?: string;
  phone?: string;
  birthday?: string;
  lstPost?: PostPayload[];
}
