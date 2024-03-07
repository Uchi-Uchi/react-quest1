import React from 'react';

import Todo from './Todo';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  editTodoIdState,
  filterStatusState,
  filteredTodoListState,
} from "../states/recoilState";
import { Box, Select } from "@chakra-ui/react";

type FilterStatus = "全て" | "未着手" | "進行中" | "完了";

type TodoListProps = {
  onClickEdit: (id: number) => void;
  onClickDelete: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  onClickEdit,
  onClickDelete,
}) => {
  const [filterStatus, setFilterStatus] = useRecoilState(filterStatusState);
  const filteredTodoList = useRecoilValue(filteredTodoListState);
  const [editTodoId] = useRecoilState(editTodoIdState);

  return (
    <Box className="todo-list" bg="#FFF" borderRadius="8px" w="500px" display="flex" alignItems="center" flexDirection="column" minH="130px" mt="30px">
      <Box className="filter" display="flex" justifyContent="center">
        <Select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          borderRadius="8px"
          my= {5}
        >
          <option value="全て">全て</option>
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </Select>
      </Box>
      {filteredTodoList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            editTodoId={editTodoId}
          />
      ))}
    </Box>
  );
};

export default TodoList;