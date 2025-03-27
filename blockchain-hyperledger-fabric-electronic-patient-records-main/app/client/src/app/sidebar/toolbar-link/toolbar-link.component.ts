// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-toolbar-link',
//   templateUrl: './toolbar-link.component.html',
//   styleUrls: ['./toolbar-link.component.scss']
// })
// export class ToolbarLinkComponent {
//   @Input() public icon = '';
//   @Input() public text = '';
//   @Input() public routerLink: string | string[] | undefined;
//   @Input() public queryParams: any;
// }
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-link',
  templateUrl: './toolbar-link.component.html',
  styleUrls: ['./toolbar-link.component.scss']
})
export class ToolbarLinkComponent {
  @Input() icon = '';
  @Input() text = '';
  @Input() routerLink: string | string[] | undefined;
  @Input() queryParams: any;
  @Input() disabled = false;
}