import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';



@Component({
  tag: 'todo-item',
  styleUrl: 'todo-item.css',
  shadow: true
})
export class TodoItem {
  @Prop() posicao: number;
  @Prop() descricao: string;
  @State() feito: boolean = false;
  @Event() excluiItem: EventEmitter;
  @Event() marcaFeito: EventEmitter

  excluirTarefas = () => this.excluiItem.emit(this.posicao);

  tarefaConcluida = () => {
    this.feito = !this.feito;
    this.marcaFeito.emit({ pos: this.posicao, feito: this.feito });
  }

  render() {
    return (
      <div class="tarefa">
        <div>Teste</div>
        <div>
          <input type="checkbox" class="tarefa--alterar" checked={this.feito} onChange={() => this.tarefaConcluida()} />
          <label class={`${this.feito ? 'concluido' : ''} tarefa--descricao`} onClick={() => this.tarefaConcluida()}>{this.descricao}</label>
        </div>
        <button class="tarefa--botao" onClick={() => this.excluirTarefas()}>&#215;</button>
      </div>
    );
  }
}
