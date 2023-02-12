jest.mock('../../src/infrastructure/database/Connection', () => ({
  __esModule: true,
  default: {
    execute: jest.fn(),
  },
}));
