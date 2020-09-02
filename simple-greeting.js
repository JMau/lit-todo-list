import { LitElement, html, css } from 'lit-element';
import './todo-list.js'

const name = 'Mau';
const footerTemplate = html`
<footer>Made with love by ${name} </footer>
`;
class SimpleGreeting extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background: radial-gradient(circle at top left,#a9e235 0,#4dff91 50%,#04e5f0 100%);
        height: 100vh;
      }
      .btn-agregar {
        display: inline-block;
        padding: 0px;
        width: 3rem;
        height: 1.5rem;
        background-color: teal;
        color: white;
      }
      .input-agregar {
        display: inline;
        background: transparent;
        color: white;
        border: none;
        border-bottom: 2px solid rgb(221, 221, 221);
        outline: none;
        width: 100%;
        line-height: 2rem;
        font-size: 1rem;
      }
    `;
  }

  static get properties() {
    return { 
      todos: { 
        type: Array 
     }
    };
  }

  constructor() {
    super();
    this.todos = [
      {text: 'Do A', finished: true},
      {text: 'Do B', finished: false},
      {text: 'Do C', finished: true}
      ];
  }

  render() {
    return html`
    <h1>Todo App</h1>
    <input class="input-agregar" id="addTodoInput" placeholder="Name" />
    <button class="btn-agregar" @click="${this._addTodo}"> Añadir </button>

    <todo-list
      .todos="${this.todos}"
    >
    </todo-list>

  
    ${footerTemplate}
    `;
  }

  _addTodo(){
    const input = this.shadowRoot.getElementById('addTodoInput');
    const text = input.value;
    input.value = '';
    this.todos = [
      ...this.todos, {text, finished:false}
    ]
    // this.todos.push({text, finished: false});
    // this.requestUpdate();
  }

  _removeTodo(todo){
    this.todos = this.todos.filter(e => e !== todo);
  }

  _changeTodoFinished(e, changeTodo){
    const finished= e.target.checked;
    this.todos = this.todos.map(todo => {
      if(todo !== changeTodo){
        return todo;
      }
      return {...changeTodo, finished}
    })
  }
}

customElements.define('simple-greeting', SimpleGreeting);
