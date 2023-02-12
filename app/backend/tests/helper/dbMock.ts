jest.mock('../../src/infrastructure/utils/Connection', () => ({
  __esModule: true,
  default: {
    execute: jest.fn(),
  },
}));
