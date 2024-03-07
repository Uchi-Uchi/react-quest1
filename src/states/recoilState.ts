import { atom, selector } from "recoil"

export type TodoStatus = "未着手" | "進行中" | "完了";

export type Todo = {
  id: number;
  title: string;
  status: TodoStatus;
  detail: string;
  createdAt: Date;
  updatedAt?: Date | undefined;
};

export type FilterStatus = "全て" | "未着手" | "進行中" | "完了";

export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: []
});

export const todoTitleState = atom<string>({
  key: "todoTitleState",
  default: ""
});

export const todoStatusState = atom<TodoStatus>({
  key: "todoStatusState",
  default: "未着手"
});

export const todoDetailState = atom<string>({
  key: "todoDetailState",
  default: ""
});

export const editTodoIdState = atom<number | null>({
  key: "editTodoIdState",
  default: null
});

export const filterStatusState = atom<FilterStatus>({
  key: "filterStatusState",
  default: "全て"
});

export const isTodoState = atom<boolean>({
  key: "isTodoState",
  default: false
});

export const deleteMessageState = atom<string>({
  key: "deleteMessageState",
  default: ""
});

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filterStatus = get(filterStatusState);
    const todoList = get(todoListState);
    if (filterStatus === "全て") {
      return todoList;
    } else {
      return todoList.filter((todo) => todo.status === filterStatus);
    }
  },
});
