import vest, { test, enforce } from 'vest';
import validator from 'validator';

enforce.extend({ isIP: validator.isIP });

export const suite = vest.create(
  'create_new_api',
  ({
    name,
    endpoint,
    authentication,
    allow_ips = [],
    deny_ips = [],
    enable_ip_filtering,
  }) => {
    test('name', 'Name is required', () => {
      enforce(name).isNotEmpty();
    });

    test('endpoint', 'Endpoint is required', () => {
      enforce(endpoint).isNotEmpty();
    });

    test('endpoint', 'Endpoint should match pattern "^/"', () => {
      enforce(endpoint).matches(/^\//);
    });

    const { auth_header_name, auth_tokens = [] } = authentication || {};

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

    // IPs validation
    if (enable_ip_filtering) {
      if (allow_ips.length > 0) {
        for (let i = 0; i < allow_ips.length; i++) {
          test(`allow_ips[${i}].value`, 'Should be a valid IP', () => {
            enforce(allow_ips[i].value).isIP();
          });
        }
      }

      if (deny_ips.length > 0) {
        for (let i = 0; i < deny_ips.length; i++) {
          test(`deny_ips[${i}].value`, 'Should be a valid IP', () => {
            enforce(deny_ips[i].value).isIP();
          });
        }
      }
    }
  }
);
