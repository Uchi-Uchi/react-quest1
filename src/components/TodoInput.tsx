import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
  todoTitleState,
  todoStatusState,
  todoDetailState,
  editTodoIdState,
} from "../states/recoilState";
import { Input, Select, Textarea, Button, Box, Center} from "@chakra-ui/react";

type TodoStatus = "未着手" | "進行中" | "完了";

type TodoInputProps = {
  onClickAdd: () => void;
  onEditSave: () => void;
  onClickBack: () => void;
};

const TodoInput: React.FC<TodoInputProps> = ({
  onClickAdd,
  onEditSave,
  onClickBack
}) => {

  const [todoTitle, setTodoTitle] = useRecoilState(todoTitleState);
  const [todoStatus, setTodoStatus] = useRecoilState(todoStatusState);
  const [todoDetail, setTodoDetail] = useRecoilState(todoDetailState);
  const editTodoId = useRecoilValue(editTodoIdState);

  return (
    <Box className="input-area" h="150px" display="flex" alignItems="center" flexDirection="column" mt="10px">
      <Box className="input-wrapper" display="flex" alignItems="center">
        <Input
          className="input"
          placeholder="TODOを入力"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          borderRadius="8px"
          marginLeft="6px"
          padding="4px 20px"
          bg={'white'}
        />
        <Select
          className="select"
          value={todoStatus}
          onChange={(e) => setTodoStatus(e.target.value as TodoStatus)}
          borderRadius="8px"
          margin="0px 2px"
          padding="4px 6px"
          bg={'white'}
        >
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </Select>
      </Box>
      <Box className="tandb-wrapper" display="flex" flexDirection="column">
        <Textarea
          className="textarea"
          placeholder="詳細を入力"
          value={todoDetail}
          onChange={(e) => setTodoDetail(e.target.value)}
          width="340px"
          borderRadius="8px"
          margin="0px 2px"
          padding="4px 16px"
          bg={'white'}
        />
        <Center>
          <Button
            className="add-button"
            onClick={editTodoId ? onEditSave : onClickAdd}
            width="340px"
            borderRadius="8px"
            margin="0px 2px"
            padding="4px 16px"
            bgColor="#75A9FF"
            color="#fff"
            border="1.5px solid #136FFF"
            _hover={{ bgColor: "#136FFF", color: "#fff" }}
            mt={2}
          >
            {editTodoId ? "更新" : "追加"}
          </Button>
        </Center>
        <Center>
          {editTodoId && (
            <Button
              className="back-button"
              onClick={onClickBack}
              width="340px"
              borderRadius="8px"
              margin="0px 2px"
              padding="4px 16px"
              bgColor="#77F9C3"
              color="#fff"
              border="1.5px solid #00F9A9"
              _hover={{ bgColor: "#00F9A9", color: "#fff" }}
            >
              戻る
            </Button>
          )}
        </Center>
      </Box>
    </Box>
  );
};

export default TodoInput;