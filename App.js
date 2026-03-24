import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState ([
    { key: '1', description: 'Walk the dog', completed: false },
    { key: '2', description: 'Walk the cat', completed: false },
    { key: '3', description: 'Walk the dolphin', completed: false },
  ]);

  const [inputText, setInputText] = useState('');
  const [nextKey, setNextKey] = useState(4);

  const toggleTask = (key) => {
    const updatedTasks = tasks.map((task) => {
      if (task.key === key) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (inputText !== '') {
      const newTask = {
        key: nextKey,
        description: inputText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNextKey(nextKey + 1);
      setInputText('');
    }
  };

  const singleItem = ({ item }) => {
    let checkboxIcon = '☐';

    if (item.completed) {
      checkboxIcon = '☑';
    }

    let taskStyle = styles.description;

    if (item.completed) {
      taskStyle = styles.descriptionCompleted;
    }

    return (
      <View style={styles.taskRow}>
        <Text style={taskStyle}>{item.description}</Text>
        <TouchableOpacity onPress={() => toggleTask(item.key)} style={{marginRight: 30}}>
          <Text style={styles.checkboxIcon}>{checkboxIcon}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
          <Text style={styles.title}>Todo List</Text>
          <FlatList
            data={tasks}
            renderItem={singleItem}
            keyExtractor={(item) => item.key}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Add a task..."
              value={inputText}
              onChangeText={(text) => setInputText(text)}
            />
            <TouchableOpacity onPress={addTask} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  description: {
    flex: 1,
    fontSize: 16,
  },
  descriptionCompleted: {
    flex: 1, 
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  checkboxIcon: {
    fontSize: 28,
    color: '#4CAF9A',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingRight: 40,
  },
  addButtonText: {
    color: 'white',
  },
  inputRow: {
    padding: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#4CAF9A',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF9A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    color: '#4CAF9A',
    fontSize: 32,
    marginLeft: 15,
  }
});
