export interface Session {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  user: UserType
  expires_at: number
  provider_token: string
}

export interface UserType {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: AppMetadata
  user_metadata: UserMetadata
  identities: Identity[]
  created_at: string
  updated_at: string
}

type AppMetadata = {
  provider: string
  providers: string[]
}

type UserMetadata = {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  preferred_username: string
  provider_id: string
  sub: string
  user_name: string
}

type Identity = {
  id: string
  user_id: string
  identity_data: IdentityData
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
}

type IdentityData = {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  preferred_username: string
  provider_id: string
  sub: string
  user_name: string
}
