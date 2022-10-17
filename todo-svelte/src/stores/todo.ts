import { writable } from 'svelte/store';

export const todoStore = writable({
  todos: <Todo[]>[],
  editedTodo: <Todo | null>null,
  todoText: '',
  loading: false,
  error: <any>null,
  filterState: <FilterState>'ALL',
  sortAttribute: <SortAttribute>'NONE',
  sortDirection: <SortDirection>'ASC',
});
export const useTodoStore = defineStore({
  id: 'todo',
  persist: true,
  state: () => ({
    todos: <Todo[]>[],
    editedTodo: <Todo | null>null,
    todoText: '',
    loading: false,
    error: <any>null,
    filterState: <FilterState>'ALL',
    sortAttribute: <SortAttribute>'NONE',
    sortDirection: <SortDirection>'ASC',
  }),
  getters: {
    filterTodos: (state) => {
      let filterFirst = state.todos;
      switch (state.filterState) {
        case FilterState.COMPLETED:
          filterFirst = state.todos.filter(t => t.done)
          break;
        case FilterState.ACTIVE:
          filterFirst = state.todos.filter(t => !t.done)
          break
      }
      if(state.sortAttribute === SortAttribute.NONE) return filterFirst;
      filterFirst.sort((a: Todo, b: Todo) => {
        if(state.sortDirection == SortDirection.ASC)
          return a.createdAt.localeCompare(b.createdAt)
        else
          return b.createdAt.localeCompare(a.createdAt)
      });
      return filterFirst;
    }
  },
  actions: {
    async fetchTodos() {
      this.todos = []
      this.loading = true
      try {
        this.todos = await fetch('http://localhost:10000/todos')
            .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async deleteTodo(todoId: string) {
      this.loading = true
      try {
        await fetch(`http://localhost:10000/todos/${todoId}`, {method: "DELETE"})
            .then((response) => response.json())
        this.todos = this.todos.filter(t => t.id !== todoId)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async addTodo() {
      this.loading = true
      try {
        const added = await fetch('http://localhost:10000/todos', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: this.todoText,
            done: false
          })
        }).then((response) => response.json())
        this.todos.push(added)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.todoText = '';
      }
    },
    async updateTodo(todo: Todo) {
      this.loading = true
      try {
        await fetch(`http://localhost:10000/todos/${todo.id}`, {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
        }).then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
        this.todoText = '';
      }
    },

  }
})

export interface Todo {
  id: string
  text: string
  createdAt: string
  done: boolean
}

export enum FilterState {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum SortAttribute {
  NONE = 'NONE',
  DATE_ADDED = 'DATE_ADDED',
}

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
