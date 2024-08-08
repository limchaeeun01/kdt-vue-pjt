<template>
    <router-view/>
    <div class="container">
        <h2>Todos Page</h2>
        <input  class="form-control"
                type="text"
                v-model="searchTxt"
                placeholder="Search..."
                />
        <TodoForm @add-todo="addTodo"/>

        <TodoList   :todos="filteredTodos"
                    @toggle-todo="toggleTodo"
                    @delete-todo="onDelete"/>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import TodoForm from '@/components/todo/TodoForm.vue';
import TodoList from '@/components/todo/TodoList.vue';
import axios from 'axios';

export default {
    components : {
        TodoForm,
        TodoList,
    },
    setup(){
        const todo = ref('');
        const todos = ref([]);
        const searchTxt = ref('');
        const error = ref('');


        const getTodos = async () => {
            try {
            const response = await axios.get('http://localhost:3000/todos');
            todos.value = response.data;
            } catch (err) {
                console.log(err);
                error.value = 'Something went wrong...';
            }
        }
        getTodos();


        /*
        const onDelete = (index) => {
            console.log("debug >>>> todos delete index, ", index)
            todos.value.splice(index, 1);
        }
        */

        const onDelete = async (index) => {
            console.log("debug >>> todos delete index, ", index);
            error.value = '';
            const id = todos.value[index].id;
            try{
                //axios 통신을 통해서 키값을 전달하고 json-server 쪽에서 삭제
                const response = await axios.delete(`http://localhost:3000/todos/${id}`);
                console.log("debug >>>> todos delete response, ", response);
                todos.value.splice(index, 1);
            } catch(err){
                console.log(err);
                error.value = 'Something went wrong...';
            }
            
        }

        const filteredTodos = computed(() => {
            if (searchTxt.value) {
                return todos.value.filter(todo => {
                    return todo.subject.includes(searchTxt.value);
        
                });
            }
            return todos.value;
        });

        /*
        기존 배열에 담았던 객체 정보를
        axios 통신을 통해서 json-server db.json에 저장하도록 변경
        
        const addTodo = (data) => {
            error.value = '';
            axios.post('http://localhost:3000/todos', {
                id : Date.now(),
                subject : data.subject,
                completed : data.completed
            }).then(response => {
                console.log(response);
                console.log(response.data);
                todos.value.push(response.data);
            }).catch(err => {
                console.log(err);
                error.value = 'Something went wrong...'
            });

        }
        */

        const addTodo = async(data) => {
            try{
                const response = await axios.post('http://localhost:3000/todos', {
                id : Date.now(),
                subject : data.subject,
                completed : data.completed
            });
            todos.value.push(response.data);
            }catch(err){
                console.log(err);
                error.value = 'Something went wrong...';
            }
            
        }
        /*
        const toggleTodo = (index) => {
           todos.value[index].completed = !todos.value[index].completed;
           
        }
        
        axios patch 이용해서
        */

        const toggleTodo = async(index) => {
            const todo = todos.value[index];
            todo.completed = !todo.completed;
            try {
                await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
                completed : todo.completed
                });
                //todo.completed = response.data.completed;
            } catch (err) {
                console.log(err);
                error.value = 'Something went wrong...';
            }

        }
        
        return{
            todo,
            todos,
            error,
            onDelete,
            searchTxt,
            filteredTodos,
            addTodo,
            toggleTodo,
            getTodos
        }

    }
}

</script>

<style>

</style>