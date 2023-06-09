<script setup lang='ts'>
import { toRefs, onMounted, onBeforeUnmount } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import type { iItem } from '@/stores/todoStore'

const todoStore = useTodoStore()

const { value, list } = toRefs(todoStore)

// 监听键盘回车事件
function keyboardListener(ev: KeyboardEvent):void {
  ev.key === 'Enter' && todoStore.addTodoItem()
}

// 选择事件
function checkChange(ev: Event, item:iItem):void {
  let target = ev.target as HTMLInputElement
  todoStore.checkTodo(target.checked, item.id)
}

// 组件加载完后触发 mounted生命周期
onMounted(() => {
  // 添加键盘事件监听
  window.addEventListener('keydown', keyboardListener)
})

// 离开之前触发 beforeUnmount生命周期
onBeforeUnmount(() => {
  // 移除键盘事件监听
  window.removeEventListener('keydown', keyboardListener)
})

</script>

<template>
  <div class='todoWrapper'>
    <header>
      <h2 class='todoTitle'>
        Vue <span class='todoTitleBlock'>To</span>do
      </h2>
      <div class='todoWrapper'>
        <input class='todoInput' v-model='value' type="text" placeholder='请输入待办事项'>
        <button class='todoAddButton' type='button' @click='todoStore.addTodoItem'>添加</button>
      </div>
    </header>
    <ul class='todoList' v-if='list.length'>
      <li class='todoItem' v-for='(item,index) in list' :key='item.id'>
        <div>
          <label class='todoCheckLabel'>
            <input type="checkbox" class='todoCheckbox'  @change='checkChange($event, item)'/>
          </label>
          <span :class='{ "contentChecked": item.checked }'>{{ item.value }}</span>
        </div>
        <span class='itemDelete' @click='todoStore.delTodoItem(index)'> [删除]</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
:root {
  --color-blue: #1171cb;
}
.todoTitle {
  text-align: center;
  font-size: 55px;
  margin-top: 75px;
}
.todoTitleBlock {
  color: #fff;
  padding: 0 10px;
  background-color: #1171cb;
  border-radius: 3px;
}

.todoWrapper {
  width: 600px;
  margin: auto;
  text-align: center;
  margin-top: 50px;
}
.todoInput {
  width: 400px;
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 6px;
  outline: none;
  border: 1px solid #ccc;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

.todoAddButton {
  width: 100px;
  height: 48px;
  color: #fff;
  background: #1171cb;
  border: none;
  cursor: pointer;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  font-size: 16px;
  outline: none;
}

.todoList {
  max-height: 400px;
  overflow: auto;
  padding-left: 0;
  list-style: none;
  text-align: left;
  border: 1px solid gray;
  border-radius: 3px;
  margin-top: 40px;
}
/* 隐藏滚动条 */
.todoList::-webkit-scrollbar{
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
.todoItem {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
}
/* 偶数行 */
.todoItem:nth-of-type(even) {
  background: #eee
}
.todoCheckLabel {
  display: inline-block;
  position: relative;
  width: 35px;
  height: 100%;
}
.todoCheckbox {
  width: 0;
  height: 0;
}
.todoCheckbox::before {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #1171cb;
  border-radius: 2px;
}
.todoCheckbox:checked::before {
  content: '√';
  background-color: #1171cb;
  color: #fff;
}
.itemDelete {
  min-width: 50px;
  margin-left: 10px;
  cursor: pointer;
}
.contentChecked {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>