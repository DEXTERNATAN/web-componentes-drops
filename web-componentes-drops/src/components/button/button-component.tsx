import { Component, Prop, h } from '@stencil/core';


@Component({
  tag: 'btn-component',
  styleUrl: 'button-component.css',
  shadow: true
})

export class ButtonComponent {
  /**
   * The type name
   */
  @Prop() type: string;

  render() {
    return <button type="button" class="btn btn-primary">Primary</button>
  }

}
