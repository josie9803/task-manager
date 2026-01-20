import { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, {key: Date.now().toString(), value: item.trim()}]);
    setItem("");
  };

  const deleteItem = (itemKey) => {
    setItems(prevData => prevData.filter(item => item.key !== itemKey));
  };

  const clearAllItems = () => {
    setItems([]);
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
          onPress={addItem} 
          color="green"></Button>
      </View>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.key} 
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.value}</Text>
            <Button 
              title= "Delete"
              onPress={() => deleteItem(item.key)} 
              color="red"
              ></Button>
          </View>
        )}></FlatList>

        <Button  
          title="Clear All Tasks" 
          onPress={clearAllItems} 
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
});
