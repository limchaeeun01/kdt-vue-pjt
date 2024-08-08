import {createRouter, createWebHistory} from 'vue-router';

import Home from '../todos/pages/TodoIndex.vue';
import Todos from '../todos/pages/component/TodosMain.vue';
import Todo from '../todos/pages/component/TodoView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path : '/',
            component : Home
        },
        {
            path : '/todos',
            component : Todos
        },
        {
            path : '/todos/:id',
            component : Todo
        }
    ]
});

export default router;

