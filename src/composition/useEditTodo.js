import { ref, computed } from 'vue';

export default function useEditTodo(todosRef) {
  const editingTodoRef = ref(null);
  let originTitle = null;

  const editTodo = todo => {
    originTitle = todo.title;
    editingTodoRef.value = todo;
  };
  const doneEdit = todo => {
    editingTodoRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      // 删除
      todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    }
  };
  const canceEdit = todo => {
    editingTodoRef.value = null;
    todo.title = originTitle;
  };
  const allDoneRef = computed(() => {
    return todosRef.value.filter(it => !it.completed).length === 0;
  });
  function setAllChecked(checked) {
    todosRef.value.forEach(todo => (todo.completed = checked));
  }
  return {
    editingTodoRef,
    editTodo,
    doneEdit,
    canceEdit,
    allDoneRef,
    setAllChecked,
  };
}
