<template>
    <div    v-for="(data, index) in todos"
            :key="data.id"   
            class="card mt-2">
        <div class="card-body p-2 d-flex align-items-center">
            <div class="form-check flex-grow-1">
                <input  type="checkbox" 
                        class="form-check-input"
                        :checked="data.completed"
                        @change="toggleTodo(index)">  
                <label  class="form-check-label"
                :style="data.completed ? todoStyle : {}">
                {{ data.subject }}
                    
                </label>
            </div>
            <div>
                <button class="btn btn-danger btn-sm"
                        @click="onDelete(index)">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        todos : {
            type : Array,
            required : true
        }
    },
    emits : ['toggle-todo', 'delete-todo'],
    setup(props, context){
        const todoStyle = {
            textDecoration : 'line-through' , 
            color : 'gray'
        }

        const toggleTodo = (index) => {
            context.emit('toggle-todo', index)
        }
        const onDelete = (index) => {
            context.emit('delete-todo', index);
        }

        return{
            todoStyle,
            toggleTodo,
            onDelete
        }
    }
}
</script>

<style>

</style>