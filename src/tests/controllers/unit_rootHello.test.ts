import rootHello from '../../controllers/rootHello';

describe('controllers/rootHello', () => {
  it('returns hello world from the root', () => {
    const request = {};
    const response = {
      send: jest.fn(),
    };
    // Cast them as "any" to prevent TypeScript from complaining
    rootHello(request as any, response as any);
    expect(response.send).toHaveBeenCalledWith('Hello world from the root!');
  });
});
