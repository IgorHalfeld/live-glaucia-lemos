<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <input
      @keyup.enter="addTask"
      v-model="currentWord"
      type="text"
      class="container-input">
    <ul>
      <li
        v-for="(task, index) in tasks"
        :key="index">
        <input v-model="task.isDone" type="checkbox">
        <s v-if="task.isDone">{{ task.name }}</s>
        <span v-else>{{ task.name }}</span>
        <button @click="removeTask(index)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data: () => ({
    currentWord: '',
    title: 'To-do list!',
    tasks: [
      { name: 'Assistir a live!', isDone: false },
      { name: 'Dar gostei na live :D #feliz #feliz', isDone: false },
    ]
  }),
  methods: {
    addTask() {
      this.tasks.push({
        name: this.currentWord,
        isDone: false
      })
      this.currentWord = ''
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    }
  }
}
</script>

<style src="./style.css"></style>
