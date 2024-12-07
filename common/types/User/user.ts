import { Roles } from "@/common/enums/User/user";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  id: string;
  role: keyof typeof Roles;
  company_type: string;
  picture: string;
  nickname: string;
  email_verified: boolean;
  phone_verified: boolean;
  created_at: string;
  updated_at: string;
  tenant_address: string;
  reference_code: string;
  is_active_tenant: boolean;
  is_active_user: boolean;
}
