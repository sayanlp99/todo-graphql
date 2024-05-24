import { merge } from 'lodash';
import userResolver from './userResolver';
import todoResolver from './todoResolver';

const resolvers = merge(userResolver, todoResolver);

export default resolvers;
