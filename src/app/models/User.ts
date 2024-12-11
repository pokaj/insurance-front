export interface User{
  id: number,
  name: string,
  email: string,
  role: string
}


export interface LoginResponse{
  message: string,
  data: { user: User, token: string }
}

