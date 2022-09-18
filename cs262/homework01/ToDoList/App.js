/*
Author: Ben Elpidius, bee6
Date: 9/17/2022
*/

import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Task from './components/Task';

export default function App() {
  // Initialize the current task that the user wants to input
  const [task, setTask] = useState();

  // Holds every task that the user has inputted
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    console.log(task); // Checks if handleAddTask is working
    Keyboard.dismiss(); // Closes the keyboard after every input
    setTaskItems([...taskItems, task]); // Everything the previous array holds plus an additional inputted task
    setTask(null); // Resets the text input back to empty string
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      {/* Today's Task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {/* This is where the task will go */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item}></Task>
                </TouchableOpacity>
              )
            })
          }

          {/*
          Initial Output
          <Task text={'Task 1'}></Task>
          <Task text={'Task 2'}></Task>
          */}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>

        {/* Search bar */}
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          onChangeText={(text) => setTask(text)}
          value={task}>
        </TextInput>

        {/* Adds the task after user press add sign */}
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },

  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  items: {
    marginTop: 30
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 60,
    borderColor:'#C0C0C0',
    borderWidth: 1,
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#C0C0C0',
    borderWidth: 1
  },

  addText: {
    fontWeight: 'bold',
  },
});
