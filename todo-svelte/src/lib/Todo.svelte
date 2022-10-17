<script setup>
import {SortDirection, useTodoStore} from '../stores/todo'
import moment from "moment";

let editedItem = ref(null);
const { todos, loading, error, todoText, filterState, filterTodos, sortDirection, sortAttribute } = storeToRefs(useTodoStore())
const { fetchTodos, deleteTodo, addTodo, updateTodo } = useTodoStore()
function convertDate(dateStr) {
  return moment(dateStr).format("MMM Do YY")
}

function saveToDo(todo) {
  updateTodo(todo);
  editedItem.value = null;
}

function setEditMode(todoId) {
  editedItem.value = todoId;
}

function changeSortDirection() {
  if(sortDirection.value === SortDirection.ASC) {
    sortDirection.value = SortDirection.DESC;
  } else {
    sortDirection.value = SortDirection.ASC;
  }
}

$: sortClass = {
  'fa-sort-amount-down-alt': sortDirection.value === SortDirection.ASC,
  'fa-sort-amount-up-alt' : sortDirection.value === SortDirection.DESC
};

fetchTodos()

</script>
  <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card" id="list1" style="border-radius: .75rem; background-color: #eff1f2;">
            <div class="card-body py-4 px-4 px-md-5">

              <p class="h1 text-center mt-3 mb-4 pb-3 text-primary">
                <i class="fas fa-check-square me-1"></i>
                <u>My Todo-s</u>
              </p>

              <div class="pb-2">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex flex-row align-items-center">
                      <input type="text" class="form-control form-control-lg" id="exampleFormControlInput1"
                             placeholder="Add new..." v-model="todoText">
                      <a href="#!" data-mdb-toggle="tooltip" title="Set due date"><i
                          class="fas fa-calendar-alt fa-lg me-3"></i></a>
                      <div>
                        <button type="button" class="btn btn-primary" @click="addTodo">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="my-4">

              <div class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                <p class="small mb-0 me-2 text-muted">Filter</p>
                <select class="select" v-model="filterState">
                  <option value="ALL">All</option>
                  <option value="ACTIVE">Active</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <p class="small mb-0 ms-4 me-2 text-muted">Sort</p>
                <select class="select" v-model="sortAttribute">
                  <option value="NONE">No Sorting</option>
                  <option value="DATE_ADDED">Date Added</option>
                </select>
                <a href="#!" style="color: #23af89;" data-mdb-toggle="tooltip" title="Ascending" @click="changeSortDirection">
                  <i class="fas ms-2" :class="sortClass"></i>
                </a>
              </div>
              <template v-if="todos" v-for="todo in filterTodos" :key="todo.id">
                <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
                  <li
                      class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                    <div class="form-check">
                      <input class="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked1"
                             aria-label="..." v-model="todo.done" />
                    </div>
                  </li>
                  <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                    <p class="lead fw-normal mb-0">
                      <template v-if="editedItem === todo.id">
                        <input type="text" v-model="todo.text">
                        <button type="button" class="btn btn-primary" @click="saveToDo(todo)">Save</button>
                      </template>
                      <template v-else>
                        {{ todo.text }}
                      </template>

                    </p>

                  </li>
                  <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                    <div class="d-flex flex-row justify-content-end mb-1">
                      <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo" @click="setEditMode(todo.id)"><i
                          class="fas fa-pencil-alt me-3"></i></a>
                      <a href="#!" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo" @click="deleteTodo(todo.id)"><i
                          class="fas fa-trash-alt"></i></a>
                    </div>
                    <div class="text-end text-muted">
                      <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                        <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>{{ convertDate(todo.createdAt) }}</p>
                      </a>
                    </div>
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

