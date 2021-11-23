import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle);

    if (foundTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false
      } as Task;

      setTasks(oldState => [...oldState, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const selectedTask = updatedTasks.find(task => task.id === id);

    if (!selectedTask) return;

    selectedTask.done = !selectedTask.done;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [        
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)) },
      ]
    );
  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const selectedTask = updatedTasks.find(task => task.id === taskId);

    if (!selectedTask) return;

    selectedTask.title = newTaskTitle;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})