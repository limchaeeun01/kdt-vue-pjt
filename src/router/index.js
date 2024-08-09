import {createRouter, createWebHistory} from 'vue-router';

import Home from '../todos/pages/TodoIndex.vue';
import Todos from '../todos/pages/component/TodosMain.vue';
import Todo from '../todos/pages/component/TodoView.vue';
import Life from '@/components/test/TestLifecycle.vue';
import Create from '../todos/pages/component/TodoCreate.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name : 'Home',
            path : '/',
            component : Home
        },
        {
            name : 'Todos',
            path : '/todos',
            component : Todos
        },
        {
            name : 'Todo',
            path : '/todos/:id',
            component : Todo
        },
        {
            name : 'Life',
            path : '/life',
            component : Life
        },
        {
            name : 'Create',
            path : '/todos/create',
            component : Create
        }
    ]
});

export default router;

