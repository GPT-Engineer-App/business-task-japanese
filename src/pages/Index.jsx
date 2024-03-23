import React, { useState } from "react";
import { Box, Heading, Text, Input, Button, Stack, Checkbox, Flex, Spacer, IconButton, useColorMode } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <Box p={4}>
      <Flex align="center" mb={4}>
        <Heading size="xl">タスク管理システム</Heading>
        <Spacer />
        <IconButton icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} aria-label="テーマ切り替え" />
      </Flex>
      <Box mb={4}>
        <Input placeholder="新しいタスクを入力..." value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyPress={(e) => e.key === "Enter" && addTask()} />
        <Button leftIcon={<FaPlus />} colorScheme="blue" mt={2} onClick={addTask}>
          タスクを追加
        </Button>
      </Box>
      <Stack spacing={4}>
        {tasks.map((task, index) => (
          <Flex key={index} p={4} bg={colorMode === "light" ? "gray.100" : "gray.700"} borderRadius="md" align="center">
            <Checkbox isChecked={task.completed} onChange={() => toggleTask(index)} />
            <Text ml={4} textDecoration={task.completed ? "line-through" : "none"}>
              {task.text}
            </Text>
            <Spacer />
            <IconButton icon={<FaTrash />} aria-label="タスクを削除" onClick={() => deleteTask(index)} />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default Index;
