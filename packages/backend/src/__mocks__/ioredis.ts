import EventEmitter from 'events';

const mock = jest.genMockFromModule('ioredis');
export default mock;

class Cluster extends EventEmitter {}
export { Cluster };
