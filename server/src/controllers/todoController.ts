import { Request, Response } from 'express';
import dotenv from 'dotenv'
import  TodoModel,{validate} from '../models/TodoModel';
import { ITodo } from '../helpers/interfaces';
import {redisGetAsync, redisSetAsync, } from '../utils/redis';
import elasticClient from '../utils/elasticsearch'

const todoController = {

  addTodo: async (req: Request, res: Response) => {
    try {
      const { id, task, description } = req.body;
  
      //Input Validation
      const { error } = validate(req.body);
      if (error)  return res.status(400).send({ message: error.details[0].message });
  

      // Adding the todo to MongoDB
      const newTodo: ITodo = new TodoModel({
        id, task, description
      });
      const savedTodo = await newTodo.save();
  

      // Save  todo to Redis
      const todosRedisKey = 'todos';
      const cachedTodos = await redisGetAsync(todosRedisKey);
  
      if (cachedTodos) {
        const todosArray = JSON.parse(cachedTodos);
        todosArray.unshift(savedTodo);
        await redisSetAsync(todosRedisKey, JSON.stringify(todosArray));
      } else {
        // If the todos array doesn't exist in Redis, create a new array with the saved todo
        const todosArray = [savedTodo];
        await redisSetAsync(todosRedisKey, JSON.stringify(todosArray));
      }


      // Index the todo in Elasticsearch
      try {
        await elasticClient.index({
          index: 'todos',
          document: {
            id, task, description 
          }
        })
      } catch (error) {
      }

      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  },

  getTodos: async (req: Request, res: Response) => {
    try {
      const redisKey = 'todos';
      let todos = [];
  
      // Check if todos exist in Redis cache
      const cachedTodos = await redisGetAsync(redisKey);
  
      if (cachedTodos) {
        todos = JSON.parse(cachedTodos);
      } else {
        todos = await TodoModel.find({ isDelete: false });
        await redisSetAsync(redisKey, JSON.stringify(todos));
      }
  
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  },
  
  deleteTodo: async (req: Request, res: Response) => {
    try {
      const todoId = req.params.id;
  
      // Delete the todo from MongoDB
      await TodoModel.findOneAndDelete({ id: todoId });
  
      // Delete the todo from the Redis array
      const todosRedisKey = 'todos';
      const cachedTodos = await redisGetAsync(todosRedisKey);
  
      if (cachedTodos) {
        const todosArray = JSON.parse(cachedTodos);
        const updatedTodosArray = todosArray.filter((todo: ITodo) => todo.id !== todoId);
        await redisSetAsync(todosRedisKey, JSON.stringify(updatedTodosArray));
      }
  
      // Delete the todo from Elasticsearch
      try {
        await elasticClient.deleteByQuery({
          index: 'todos',
          body: {
            query: {
              match: {
                id: todoId
              }
            }
          }
        });
      } catch (error) {
      }
  
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete todo' });
    }
  },
  
  searchTasks: async (req: Request, res: Response) => {
    try {      
      let { query } = req.params;
      let searchQuery;
      
      if (!query) {
        searchQuery = { match_all: {} }; // Match all documents
      } else {
        searchQuery = {
          bool: {
            should: [
              {
                match_phrase_prefix: {
                  task: {
                    query,
                    slop: 10,
                    max_expansions: 50
                  }
                }
              },
              {
                match_phrase_prefix: {
                  description: {
                    query,
                    slop: 10,
                    max_expansions: 50
                  }
                }
              }
            ]
          }
        };
      }
      
      await elasticClient.indices.refresh({ index: 'todos' });
      
      // Searching Logic
      const result = await elasticClient.search({
        index: 'todos',
        body: {
          query: searchQuery
        }
      });
      
      // Extract the search results
      const searchResults = result.hits.hits.map((hit: any) => hit._source);

      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ msg: 'Failed to search tasks' });
    }
  }
};

export = todoController;