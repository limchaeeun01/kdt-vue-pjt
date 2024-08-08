<template> 
    <div class="container">
        <h2>Todo Read View</h2>

        <div v-if="loading">
            Loading.......
        </div>

        <form   v-else
                @submit.prevent="onUpdate">
            <div class="row">
                <div class="col-6">
                    <div class="form-group">
                    <label>Todo Subject</label>
                    <input  type="text" 
                            class="form-control"
                            v-model="todo.subject">
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-group">
                        <label>State</label>
                        <div>
                            <button class="btn"
                                    type="button"
                                    :class="todo.completed ? 'btn btn-success' : 'btn btn-secondary'"
                                    @click.stop="toggleState">
                                    {{ todo.completed ? 'Complete' : 'InComplete'}}
                                    </button>
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn btn-outline-dark" 
                    type="submit">Update</button>
            <button class="btn btn-outline-danger ml-2"
                    @click="moveToTodos()">Cancle</button>
            
        </form>
    </div>
    
</template>

<script>


import { useRoute } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup(){
        const route = useRoute();
        const router = useRouter();

        console.log("debug >>> TodoView param, ", route.params);
        console.log("debug >>> TodoView param, ", route.params.id);

        const loading = ref(true);
        const todo = ref(null);


        const moveToTodos = () => {
            router.push(`/todos`);
        }

        const getTodos = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/todos/${route.params.id}`);
                console.log(response.data);
                todo.value = response.data;
                loading.value = false;
            } catch (err) {
                console.log(err);
            }
        }
        getTodos();

        const toggleState = () => {
            todo.value.completed = !todo.value.completed;
        }

        const onUpdate = async() => {
            try {
                await axios.patch(`http://localhost:3000/todos/${todo.value.id}`, {
                subject : todo.value.subject,
                completed : todo.value.completed
                });
                moveToTodos();
            } catch (err) {
                console.log(err);
            }

        }

        return{
            loading,
            todo,
            getTodos,
            moveToTodos,
            toggleState,
            onUpdate
        }
    }
}
</script>

<style>

</style>