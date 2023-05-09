import { defineStore } from 'pinia'

// useTodoStore
export const useTodoStore = defineStore('todoStore', {
  // 数据
  state: (): iState => {
    return {
      value: '',  // 要添加的待办事项
      list: []    // 已添加的待办事项
    }
  },
  actions: {
    // 添加待办项
    addTodoItem() {
      if(!this.value) {
        alert('请输入待办事项')
        return
      }
      this.list.push({
        id: Math.floor(Math.random() * 100000000).toString(),
        value: this.value,
        checked: false
      })
      this.value = ""
    },
    // 删除待办项
    delTodoItem(index: number) {
      this.list.splice(index, 1)
    },
    // 选择待办项
    checkTodo(checked: boolean, id: string) {
      this.list.forEach(item => {
        if(item.id === id) item.checked = checked
      })
    }
  }
})

// 待办事项类型
export interface iItem {
  id: string,
  value: string,
  checked: boolean
}

// 数据类型
export interface iState {
  value: string,
  list: iItem[]
}


