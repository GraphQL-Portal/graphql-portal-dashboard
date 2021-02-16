import vest, { test, enforce } from 'vest';

export const suite = vest.create(
  'create_new_api',
  ({ name, endpoint, authentication }) => {
    test('name', 'Name is required', () => {
      enforce(name).isNotEmpty();
    });

    test('endpoint', 'Endpoint is required', () => {
      enforce(endpoint).isNotEmpty();
    });

    test('endpoint', 'Endpoint should match pattern "^/"', () => {
      enforce(endpoint).matches(/^\//);
    });

    const { auth_header_name, auth_tokens = [] } = authentication;

    if (!!auth_header_name) {
      test('auth_tokens', 'Auth header tokens is required', () => {
        enforce(auth_tokens).isArray();
      });

      test('auth_tokens', 'Auth header tokens is required', () => {
        enforce(auth_tokens[0].value).isNotEmpty();
      });
    }

    if (auth_tokens.length > 0 && !!auth_tokens[0].value) {
      test(
        'authentication.auth_header_name',
        'Auth key header is required',
        () => {
          enforce(auth_header_name).isNotEmpty();
        }
      );
    }
  }
);
