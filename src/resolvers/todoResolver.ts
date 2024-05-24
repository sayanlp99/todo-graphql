import { Todo } from '../models/Todo';

const todoResolver = {
    Query: {
        myTodos: async (_: any, __: any, { user }: any) => {
            if (!user) throw new Error('Not authenticated');
            return await Todo.findAll({ where: { userId: user.userId } });
        },
    },
  Mutation: {
    addTodo: async (_: any, { title, description }: { title: string; description: string }, { user }: any) => {
        if (!user) throw new Error('Not authenticated');
        return await Todo.create({ title, description, userId: user.userId });
    },
    updateTodo: async (_: any, { todoId, title, description }: { todoId: number; title?: string; description?: string }, { user }: any) => {
        if (!user) throw new Error('Not authenticated');
        const todo = await Todo.findByPk(todoId);
        if (!todo || todo.userId !== user.userId) throw new Error('Not authorized');
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        await todo.save();
        return todo;
    },
    deleteTodo: async (_: any, { todoId }: { todoId: number }, { user }: any) => {
        if (!user) throw new Error('Not authenticated');
        const todo = await Todo.findByPk(todoId);
        if (!todo || todo.userId !== user.userId) throw new Error('Not authorized');
        await todo.destroy();
        return true;
    },
  },
};

export default todoResolver;
