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
                    type="submit"
                    :disabled="!todoUpdated">Update</button>
            <button class="btn btn-outline-danger ml-2"
                    @click="moveToTodos()">Cancle</button>
            
        </form>
        <Alert  v-if="showAlert"
                :message="alertMsg"
                :type="alertType"/>
    </div>
    
</template>

<script>


import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import axios from '@/axios';
import { useRouter } from 'vue-router';
import _ from 'lodash';
import Alert from '@/components/alert/AlertComponent.vue';
import { useToast } from '@/composables/toast';
export default {
    components : {
        Alert,
    },
    setup(){
        const route = useRoute();
        const router = useRouter();


        console.log("debug >>> TodoView param, ", route.params);
        console.log("debug >>> TodoView param, ", route.params.id);

        const loading = ref(true);
        const todo = ref(null);
        const originalTodo = ref(null);

        const {
            showAlert, alertMsg, alertType, triggerAlert
        } = useToast();

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

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });


        const moveToTodos = () => {
            router.push({
                name : 'Todos'
            });
        }

        const getTodos = async () => {
            try {
                const response = await axios.get(`todos/${route.params.id}`);
                console.log(response.data);
                todo.value = {...response.data};
                originalTodo.value = {...response.data};
                loading.value = false;
                triggerAlert('Successfully get Todo....');
            } catch (err) {
                console.log(err);
                triggerAlert('Something went wrong....', 'danger');
            }
        }
        getTodos();

        const toggleState = () => {
            todo.value.completed = !todo.value.completed;
        }

        const onUpdate = async() => {
            try {
                await axios.patch(`todos/${todo.value.id}`, {
                subject : todo.value.subject,
                completed : todo.value.completed
                });
                moveToTodos();
                triggerAlert('Successfully updated....');
            } catch (err) {
                console.log(err);
                triggerAlert('Something went wrong....', 'danger');
            }

        }

        return{
            loading,
            todo,
            getTodos,
            moveToTodos,
            toggleState,
            onUpdate,
            originalTodo,
            todoUpdated,
            showAlert,
            alertMsg,
            alertType
        }
    }
}
</script>

<style>

</style>