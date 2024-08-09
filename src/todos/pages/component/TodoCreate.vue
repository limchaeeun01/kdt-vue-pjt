<template>
    <div class="container">
        <h2>Todo-Create</h2>
        <form @submit.prevent="onSubmit"  class="d-flex">
        <div class="flex-grow-1 mr-2">
            <input  class="form-control"
                    type="text"
                    placeholder="Add Your To-Do"
                    v-model="todo">
        </div>
        <div>
            <button class="btn btn-primary" 
                    type="submit">Add</button>
        </div>
    </form>

    <div v-show="hasError" style="color : red;">
        This field cannot be empty!!!
    </div>
    </div>
</template>

<script>
import axios from '@/axios';
import { useRouter } from 'vue-router';
import {ref} from 'vue';

export default {
    setup(){
        const todo = ref('');
        const hasError = ref(false);
        const router = useRouter();
        const onSubmit = async() => {
            if(todo.value === ''){
                hasError.value = true;
            }else{
                try{
                    await axios.post('todos',
                        {
                            id : Date.now(),
                            subject : todo.value,
                            completed : false
                        }
                    )
                }catch(err){
                    console.log(err);
                }
                hasError.value = false;
                todo.value = '';
                router.push({
                    name : 'Todos'
                });
            }
            
        }

        return{
            todo,
            hasError,
            onSubmit
        }

    }
}
</script>

<style>

</style>