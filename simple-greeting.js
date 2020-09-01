import { LitElement, html } from 'lit-element';

const name = 'Mau';
const footerTemplate = html`
<footer>Made with love by ${name} </footer>
`;
class SimpleGreeting extends LitElement {
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
    <input id="addTodoInput" placeholder="Name" />
    <button @click="${this._addTodo}"> Añadir </button>
    <ol>
      ${this.todos.map(
        todo => html`
        <li>
        <input type="checkbox" .checked=${todo.finished} @change=${e => this._changeTodoFinished(e, todo)} />
        ${todo.text} (${todo.finished ? 'finished' : 'unfinished'})
        <button @click="${() => this._removeTodo(todo)}"> X </button>
        
        </li>
        `
      )}
    </ol>
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
