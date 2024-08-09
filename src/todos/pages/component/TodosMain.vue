<template>
    <router-view/>

    <div class="container">
        <h2>Todos Page</h2>
        <input  class="form-control"
                type="text"
                v-model="searchTxt"
                placeholder="Search..."
                />
        <!-- <TodoForm @add-todo="addTodo"/> -->
        <!-- 아래 버튼 클릭시 router(todos/create)를 이용해서 TodoCreate.vue로 이동
        컴포넌트 이동이 확인 되었으면 TodoForm의 화면 구성을 하고 
        데이터를 입력하면 axios를 이용해서 데이터를 json-server에 전달
        오류가 없으면 화면을 router(todos)를 이용해서 list로 화면 전환-->

        <p/>
        <div class="d-grid gap-2" align="right">
            <button class="btn btn-primary" 
                    type="button"
                    @click="moveToCreate">CREATE</button>
        </div>
        <p/>

        <TodoList   :todos="filteredTodos"
                    @toggle-todo="toggleTodo"
                    @delete-todo="onDelete"/>
    </div>

    <Alert  v-if="showAlert"
                :message="alertMsg"
                :type="alertType"/>
</template>

<script>
import {ref, computed} from 'vue';
//import TodoForm from '@/components/todo/TodoForm.vue';
import TodoList from '@/components/todo/TodoList.vue';
import axios from '@/axios';
import Alert from '@/components/alert/AlertComponent.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';
export default {
    components : {
        //TodoForm,
        TodoList,
        Alert
    },
    setup(){
        const todo = ref('');
        const todos = ref([]);
        const searchTxt = ref('');
        const error = ref('');

        const {
            showAlert, alertMsg, alertType, triggerAlert
        } = useToast();

        const router = useRouter();

        const moveToCreate = () => {
            router.push(`/todos/create`);
        }

        // const showAlert = ref(false);
        // const alertMsg = ref('');
        // const alertType = ref('');

        // const triggerAlert = (message, type = 'success') => {
        //     showAlert.value = true;
        //     alertMsg.value = message;
        //     alertType.value = type;
        //     setTimeout( () =>{
        //         showAlert.value = false;
        //         alertMsg.value = '';
        //         alertType.value = '';
        //     }, 5000);
        // }


        const getTodos = async () => {
            try {
            const response = await axios.get('todos');
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
                const response = await axios.delete(`todos/${id}`);
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
                const response = await axios.post('todos', {
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
                await axios.patch(`todos/${todo.id}`, {
                completed : todo.completed
                });
                triggerAlert('Successfully done...');
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
            getTodos,
            showAlert,
            alertMsg,
            alertType,
            triggerAlert,
            moveToCreate
        }

    }
}

</script>

<style>

</style>