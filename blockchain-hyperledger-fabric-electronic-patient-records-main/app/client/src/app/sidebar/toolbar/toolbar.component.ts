// import { Component, OnInit, Input } from '@angular/core';

// @Component({
//   selector: 'app-toolbar',
//   templateUrl: './toolbar.component.html',
//   styleUrls: ['./toolbar.component.scss']
// })
// export class ToolbarComponent implements OnInit {

//   @Input() public text = '';

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() text = ''; // Input for dynamic title
}