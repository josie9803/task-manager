import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, FlatList, TextInput } from 'react-native';

export default function App() {
  //setItem & setTasks are functions, can be used within onChangeText, onPress
  //but if too many things to do beside just update the current value, then we make a new function and pass it to onPress etc
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const filteredTasks = () => {
    if (filter === "Completed") {return tasks.filter(task => task.completed);}
    if (filter === "Incomplete") {return tasks.filter(task => !task.completed);}
    return tasks;
  }

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
      <View style={styles.filterRow}>
        <Pressable onPress={() => setFilter("All")} 
                  style={({pressed}) => [
                      styles.filterdButton,
                      pressed && styles.filterButtonPressed,
                      filter === "All" && styles.filterButtonActive,
                    ]}>
          <Text style={[styles.filterdButtonText, filter === "All" && styles.filterButtonTextActive]}>All</Text>
        </Pressable>
        <Pressable onPress={() => setFilter("Completed")} 
                  style={({pressed}) => [
                      styles.filterdButton,
                      pressed && styles.filterButtonPressed,
                      filter === "Completed" && styles.filterButtonActive, 
                    ]}>
          <Text style={[styles.filterdButtonText, filter === "Completed" && styles.filterButtonTextActive]}>Completed</Text>
        </Pressable>
        <Pressable onPress={() => setFilter("Incomplete")}
                  style={({pressed}) => [
                    styles.filterdButton,
                    pressed && styles.filterButtonPressed,
                    filter === "Incomplete" && styles.filterButtonActive, 
                  ]}>
          <Text style={[styles.filterdButtonText, filter === "Incomplete" && styles.filterButtonTextActive]}>Incomplete</Text>
        </Pressable>
      </View>
      <View style={styles.inputRow}>
        <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={item}
        onChangeText={setItem}></TextInput> 
        <Pressable onPress={addTask} disabled={!item.trim()} 
                  style={[styles.addButton, !item.trim() && styles.addButtonDisabled]}>
            <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      
      <FlatList
        data={filteredTasks()}
        keyExtractor={(item) => item.key} 
        renderItem={({ item }) => (
          <View style={[styles.listItem, item.completed && styles.completedRow]}>
            <Text 
              style={[
                styles.listItemText,
                item.completed && styles.completedTask
              ]}
            >
              {item.text}
            </Text>
            <Pressable onPress={() => markComplete(item.key)} style={styles.markCompleteButton}>
              <Text style={styles.markCompleteText}>{item.completed ? "Completed ✓" : "Complete"}</Text>
            </Pressable>
            <Pressable onPress={() => deleteTask(item.key)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}></FlatList>

        <Pressable onPress={clearAllTasks} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All Tasks</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
  },
  addButtonDisabled: {
    backgroundColor: "#bdbdbd",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterdButton: {
    borderWidth: 1,
    borderColor: "#6495ED",
    padding: 10,
    borderRadius: 5,
  },
  filterButtonPressed: {
    backgroundColor: "#bcd4ff", // ⭐ when finger is pressing
  },

  filterButtonActive: {
    backgroundColor: "#6495ED", // ⭐ selected filter
  },
  filterdButtonText: {
    color: "#6495ED",
    fontWeight: "bold",
  },
  filterButtonTextActive: {
    color: "white",
  },
   filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    textAlign: "left",
  },
  completedTask: {
    textDecorationLine: 'line-through', 
    color: 'gray', 
  },
  markCompleteButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 6, 
  },
  markCompleteText: {
    color: "white",
  },
  completedRow: {
    opacity: 0.5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
