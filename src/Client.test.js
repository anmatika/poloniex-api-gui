import Client from './Client';
import fetch from 'isomorphic-fetch';

describe('Client post', ()=> {
    beforeEach(function() {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 200,
               json: () => ({
               biz: 'buzz'
            })
          }));
    });
    it('resolves json', ()=> {
        return Client.post('foo', 'bar').then(response => {
            expect(response).toEqual({
                biz: 'buzz'
            });
        })
    })
});
