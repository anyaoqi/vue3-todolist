<script setup lang='ts'>
import { reactive, toRefs, onMounted, onBeforeUnmount } from 'vue'

// item类型
interface iItem {
  id: string,
  value: string,
  checked: boolean
}
// todo数据类型
interface iTodo {
  value: string,
  list: Array<iItem>  // 泛型数组写法
}

// 数据
const todoData:iTodo = reactive({
  value: '',  // 要添加的值
  list: [],   // 已添加的列表
})

// 将数据通过toRefs转为ref对象（方便在template模板中使用）
const { value, list } = toRefs(todoData)

// 添加待办事项
function addTodoItem() {
  if(!todoData.value) {
    alert('请输入待办事项')
    return
  }
  todoData.list.push({
    value: todoData.value,
    id: String(Math.floor(Math.random() * 1000000)),
    checked: false
  })
  todoData.value = ""
}

// 删除待办事项
function delTodoItem(index: number):void {
  todoData.list.splice(index, 1)
}

// 监听键盘回车事件
function keyboardListener(ev: KeyboardEvent):void {
  ev.key === 'Enter' && addTodoItem()
}

// 选择事件
function checkChange(ev: Event, item:iItem):void {
  let target = ev.target as HTMLInputElement
  let index = todoData.list.findIndex(todoItem => todoItem.id === item.id)
  if(index !==-1 ) {
    todoData.list[index].checked = target.checked
  }
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
        <button class='todoAddButton' type='button' @click='addTodoItem'>添加</button>
      </div>
    </header>
    <ul class='todoList' v-if='list.length'>
      <li class='todoItem' v-for='(item,index) in list' :key='index'>
        <div>
          <label class='todoCheckLabel'>
            <input type="checkbox" class='todoCheckbox'  @change='checkChange($event, item)'/>
          </label>
          <span :class='{ "contentChecked": item.checked }'>{{ item.value }}</span>
        </div>
        <span class='itemDelete' @click='delTodoItem(index)'> [删除]</span>
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