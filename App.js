import { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {
  //setItem & setTasks are functions, can be used within onChangeText, onPress
  //but if too many things to do beside just update the current value, then we make a new function and pass it to onPress etc
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    //object has 3 props
    const newTask = {
      key: Date.now().toString(), 
      text: item.trim(), 
      completed: false
    };
    setTasks([...tasks, newTask]); //setTasks accepts Direct Value (next state), a new array in this case created by using array spread to add new item
    setItem("");
  };

  const deleteTask = (itemKey) => {
    setTasks(prevData => prevData.filter(item => item.key !== itemKey)); //setTasks accepts Updater Function (prev state). syntax: prev => newState
  };

  const markComplete = (itemKey) => {
    setTasks(prevData => prevData.map((item) => (item.key === itemKey ? {...item, completed: !item.completed} : item))); //object spread syntax to access object property
  }

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.inputRow}>
        <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={item}
        onChangeText={setItem}></TextInput> 
        <Button 
          title="Add Task" 
          onPress={addTask} 
          color="green"></Button>
      </View>
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key} 
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text 
              style={[
                styles.listItemText,
                item.completed && styles.completedTask
              ]}
            >
              {item.text}
            </Text>
            <Button 
              title= "Completed"
              onPress={() => markComplete(item.key)}
              color="green">
            </Button>
            <Button 
              title= "Delete"
              onPress={() => deleteTask(item.key)} //why () here?
              color="red"
              ></Button>
          </View>
        )}></FlatList>

        <Button  
          title="Clear All Tasks" 
          onPress={clearAllTasks} 
          color="red"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold'
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    flex: 1,
    height: 40,
    marginRight: 8,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 5,
  },
  listItem: {
    backgroundColor: '#ffffff', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  listItemText: {
    color: 'black',
    fontSize: 14,
  },
  completedTask: {
    textDecorationLine: 'line-through', 
    color: 'gray', 
  }

});
