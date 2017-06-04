import fetch from 'isomorphic-fetch';
import Client from './Client';

describe('Client post', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => ({
        biz: 'buzz',
      }),
    }));
  });

  it('resolves json', () => Client.post('foo', 'bar').then((response) => {
    expect(response).toEqual({
      biz: 'buzz',
    });
  }));
});
