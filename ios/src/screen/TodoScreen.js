import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from 'react-native-paper';



const TodoScreen = () => {

    const [todo, setTodo] = useState('')
    const [todoList, setTodoList] = useState([]);
    const [editedTodo, setEditedTodo] = useState(null);

    //handle add button
    const handleAddTodo = () => {
        if(todo === ""){
            return;
        }
        setTodoList([...todoList, {id: Date.now().toString(), title: todo}]);
        setTodo('');
    }

    // handle delete icon
    const handleDeleteTodo = (id) => {
        const updatedTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(updatedTodoList);
    }

    //handle edit
    const handleEditTodo = (todo) => {3
        setEditedTodo(todo);
        setTodo(todo.title);
    }

    const handleUpdateTodo = () => {
        const updatedTodo = todoList.map((item)=> {
            if(item.id === editedTodo.id){
                return{...item, title: todo}
            }
            return item;
        });
        setTodoList(updatedTodo);
        setEditedTodo(null);
        setTodo('');
    }

    const renderTodo = ({ item, index}) => {
        return (
            <View style={{ 
                backgroundColor: 'grey', 
                borderRadius: 6, 
                paddingHorizontal: 6,
                paddingVertical: 12,
                marginBottom: 12,
                flexDirection: 'row',
                }}>
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '700',
                    flex: 1,
                }}>
                    {item.title}
                </Text>


                <IconButton icon='pencil'
                    onPress ={()=> {handleEditTodo(item)}}
                />
                <IconButton icon='trash-can'
                    onPress ={()=> {handleDeleteTodo(item.id)}}
                />
            </View>
        )
    }
  return (
    <View style= {{paddingHorizontal: 16}}>
      <TextInput style={{ 
        borderWidth: 2, 
        borderColor: 'black', 
        borderRadius: 6, 
        paddingVertical: 15,
        paddingHorizontal: 18,
        }} 
        placeholder='Add your name'
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
        />
        {
            editedTodo ? (<TouchableOpacity style={{ 
                backgroundColor:'purple',
                borderRadius: 6,
                paddingVertical: 12,
                marginVertical: 35,
                alignItems: 'center',
            }}
            onPress={() => handleUpdateTodo()}
            >
                <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 24,
                }}>
                    Save
                </Text>
            </TouchableOpacity> ) : (
            <TouchableOpacity style={{ 
                backgroundColor:'purple',
                borderRadius: 6,
                paddingVertical: 12,
                marginVertical: 35,
                alignItems: 'center',
            }}
            onPress={() => handleAddTodo()}
            >
                <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 24,
                }}>
                    Add
                </Text>
            </TouchableOpacity>

        )}

        {/* Render name list */}
        <FlatList 
        data = {todoList} renderItem={renderTodo} />
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({})