import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
// import '../styles.css';
import { useRecoilState } from "recoil";
import { 
  Todo,
  todoListState,
  todoTitleState,
  todoStatusState,
  todoDetailState,
  editTodoIdState,
  isTodoState,
  deleteMessageState,
} from "../states/recoilState";
import { Box, Center, Text } from "@chakra-ui/react";

const AppContent: React.FC =() => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoStatus, setTodoStatus] = useRecoilState(todoStatusState);
  const [todoDetail, setTodoDetail] = useRecoilState(todoDetailState);
  const [editTodoId, setEditTodoId] = useRecoilState(editTodoIdState);

  const [isTodo, setIsTodo] = useRecoilState(isTodoState);

  const [deleteMessage, setDeleteMessage] = useRecoilState(deleteMessageState);

  const getNextId = (): number => {
    const nextId = Math.max(...todoList.map((todo) => todo.id))
    return nextId !== -Infinity ? nextId : 0;
  }

  const onClickAdd = (): void => {
    if (todoTitle === "") {
      setIsTodo(true);
    } else {
      setIsTodo(false);

      const newTodo: Todo = {
        id: getNextId() + 1,
        title: todoTitle,
        status: todoStatus,
        detail: todoDetail,
        createdAt: new Date(),
        updatedAt: undefined,
      };
  
      setTodoList([...todoList, newTodo]);
      setTodoTitle("");
      setTodoStatus("未着手");
      setTodoDetail("");

      setDeleteMessage("");
      setIsTodo(false);
    }
  }

  const onClickEdit = (id: number): void => {
    setEditTodoId(id)

    const editTodo = todoList.find((todo) => (
      todo.id === id
    ));
    if (editTodo) {
      setTodoTitle(editTodo.title);
      setTodoStatus(editTodo.status);
      setTodoDetail(editTodo.detail);
  
      setIsTodo(false);
    }
  }

  const onEditSave = (): void => {
    if (todoTitle === "") {
      setIsTodo(true);
    } else {
      setIsTodo(false);
      const updateTodo = todoList.map((todo) => {
        if(todo.id === editTodoId) {
          return {
            ...todo,
            title: todoTitle,
            status: todoStatus,
            detail: todoDetail,
            updatedAt: new Date(),
          }
        }
        return todo
      })
      setTodoList(updateTodo);
      setEditTodoId(null);
      setTodoTitle("");
      setTodoStatus("未着手");
      setTodoDetail("");

      setDeleteMessage("");
      setIsTodo(false);
    }
  }

  const onClickBack = (): void => {
    setEditTodoId(null);
    setTodoTitle("");
    setTodoStatus("未着手");
    setTodoDetail("");

    setDeleteMessage("");
    setIsTodo(false);
  }

  const onClickDelete = (id: number): void => {
    if(editTodoId && editTodoId === id) {
      setDeleteMessage("編集中のTODOは削除できません")
      return;
    } 
    const newTodo = todoList.filter((todo) => (
      todo.id !== id
    ))
    setTodoList(newTodo);
    setDeleteMessage("");
  }

  return (
    <>
      <Box bg="#EEE" borderRadius="8px" w="700px" display="flex" alignItems="center" flexDirection="column" minH="100vh">
        <Box className="head" h="100px">
          <Center>
            <Text className="todo-app" textAlign="center" fontSize="40px">TODO APP</Text>
          </Center>
          {isTodo && <Text color="red" textAlign="center">TODOを入力してください</Text>}
        </Box>
        <TodoInput onClickAdd={onClickAdd} onEditSave={onEditSave} onClickBack={onClickBack} />
        <Box mt={20}>
          {deleteMessage && <Text color="red" textAlign="center">{deleteMessage}</Text>}
        </Box>
        <TodoList onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
      </Box>
    </>
  );
};

export default AppContent;


