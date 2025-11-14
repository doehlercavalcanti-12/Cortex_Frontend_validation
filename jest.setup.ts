import '@testing-library/jest-dom';

import { TextDecoder, TextEncoder } from 'util';

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

if (!global.TextDecoder) {
  // @ts-expect-error TextDecoder types expect encoding parameter
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}
