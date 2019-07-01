import { Component, State, Listen, Watch, h } from "@stencil/core";
import { format } from '../../utils/utils';

@Component({
  tag: "todo-list",
  styleUrl: "todo-list.css"
})
export class TodoList {
  @State() concluidas: number = 0;
  @State() tarefas: Array<{ feito: boolean; descricao: string }> = [];
  @State() input: string = "";
  @Listen('keydown')
  onEnter(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
      this.salvar();
    }
  }
  @Watch('tarefas') watchaTarefasConcluidas(newValue: Array<any>) {
    this.concluidas = newValue.reduce((count, val, i, newValue) => val.feito ? ++count : count, 0);
  }

  changeInputValue = ev => this.input = ev.target.value;

  salvar = () => {
    if (this.input != "" && this.input.trim() != "") {
      this.tarefas = [...this.tarefas, { descricao: this.input, feito: false }];
      this.input = "";
    }
  }

  tarefaConcluida = (tarefa: CustomEvent) => {
    this.tarefas[tarefa.detail.pos].feito = tarefa.detail.feito;
    this.tarefas = [...this.tarefas];
  }

  excluirTarefas = (ev: CustomEvent) => {
    this.tarefas.splice(ev.detail, 1);
    this.tarefas = [...this.tarefas];
  }

  render() {
    return (
      <div class="todo">
        <h2 class="titulo">Lista de tarefas</h2>
        <div class="input">
          <div>
            <input type="text" placeholder="Nova tarefa..." class="input--campo" value={this.input} onInput={(ev) => this.changeInputValue(ev)} />
          </div>
          <button class="input--botao" onClick={() => this.salvar()}>Adicionar</button>
        </div>
        <p class="contador">{`(${this.concluidas}/${this.tarefas.length})`}</p>

        <hr />

        <div class="lista">
          {this.tarefas.length > 0 ? (
            this.tarefas.map((tarefa, index) => <todo-item posicao={index} descricao={tarefa.descricao} onMarcaFeito={(ev) => this.tarefaConcluida(ev)} onExcluiItem={ev => this.excluirTarefas(ev)}></todo-item>)
          ) : (
              <h2 class="lista--vazia">Você não possui tarefas!</h2>
            )}
        </div>
      </div>
    );
  }
}
