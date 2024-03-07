import React from 'react';
import { Box, Text, Button } from "@chakra-ui/react";

type TodoStatus = "未着手" | "進行中" | "完了";

type TodoProps = {
  todo: {
    id: number;
    title: string;
    status: TodoStatus;
    detail: string;
    createdAt: Date;
    updatedAt?: Date | undefined;
  };
  onClickEdit: (id: number) => void;
  onClickDelete: (id: number) => void;
  editTodoId: number | null;
};

const Todo: React.FC<TodoProps> = ({ todo, onClickEdit, onClickDelete, editTodoId }) => {
  return (
    <Box
      className="todo"
      bg={todo.status === "完了" ? "#EEE" : undefined}
      p={4}
      borderRadius="8px"
      m={3}
    >
      <Text>ID: {todo.id}</Text>
      <Text>タイトル: {todo.title}</Text>
      <Text>状態: {todo.status}</Text>
      <Text>詳細: {todo.detail}</Text>
      <Text>作成日: {todo.createdAt.toLocaleString()}</Text>
      <Text>更新日: {todo.updatedAt ? todo.updatedAt.toLocaleString() : "-"}</Text>
      <Box display="flex" justifyContent="center" mt={5}>
        <Button
          className="edit-button"
          onClick={() => onClickEdit(todo.id)}
          colorScheme="purple"
        >
          {editTodoId && editTodoId === todo.id ? "編集中" : "編集"}
        </Button>
        <Button
          className="delete-button"
          onClick={() => onClickDelete(todo.id)}
          colorScheme="red"
          ml={4}
        >
          削除
        </Button>
      </Box>
    </Box>
  );
};

export default Todo;