import { gql } from '@apollo/client';

export const DELETE_API_DEF = gql`
  mutation deleteApiDef($id: ID!) {
    deleteApiDef(id: $id)
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!, $device: String!) {
    login(email: $email, password: $password, device: $device) {
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshTokens($refreshToken: String!, $device: String!) {
    refreshTokens(refreshToken: $refreshToken, device: $device) {
      accessToken
      refreshToken
    }
  }
`;
