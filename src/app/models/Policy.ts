
export interface Policy {
  id: number;
  policy_number: string;
  customer_name: string;
  policy_type: string;
  status: string;
  premium_amount: string;
  start_date: Date | null | string;
  end_date: Date | null | string;
}

export interface PolicyResponse {
  message: string;
  data: Array<Policy>;
}

export interface SinglePolicyResponse {
  message: string;
  data: Policy;
}

