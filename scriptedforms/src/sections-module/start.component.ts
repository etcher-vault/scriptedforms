// scriptedforms
// Copyright (C) 2017 Simon Biggs

// Licensed under both the Apache License, Version 2.0 (the "Apache-2.0") and 
// GNU Affrero General Public License as published by the Free Software 
// Foundation, either version 3 of the License, or (at your option) any later 
// version (the "AGPL-3.0+").

// You may not use this file except in compliance with both the Apache-2.0 AND 
// the AGPL-3.0+ in combination (the "Combined Licenses").

// You may obtain a copy of the AGPL-3.0+ at

//     https://www.gnu.org/licenses/agpl-3.0.txt

// You may obtain a copy of the Apache-2.0 at 

//     https://www.apache.org/licenses/LICENSE-2.0.html

// Unless required by applicable law or agreed to in writing, software
// distributed under the Combined Licenses is distributed on an "AS IS" BASIS, 
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See 
// the Combined Licenses for the specific language governing permissions and 
// limitations under the Combined Licenses.

/*
Creates the [start] section.

A section that runs all code within it whenever a kernel is connected to a new
session.

Eventually this section should be set to also rerun if the code within it
differs from the previous iteration. That way a kernel restart would not be
required if new code is added into the [start] section.
*/


import {
  Component, ContentChildren, QueryList, Input
} from '@angular/core';

import { CodeComponent } from '../code-module/code.component';
// import { LiveComponent } from '../sections-module/live.component';
// import { ButtonComponent } from '../sections-module/button.component';

@Component({
  selector: 'section-start',
  template: `<ng-content></ng-content>`
// <div align="right" *ngIf="(!hasStartRun)">
//   <button
//   mat-mini-fab
//   (click)="runCode()">
//     <mat-icon>autorenew</mat-icon>
//   </button>
// </div>`
})
export class StartComponent {
  // liveComponents: QueryList<LiveComponent>;
  // buttonComponents: QueryList<ButtonComponent>;
  @Input() always?: string;

  startId: number;
  hasStartRun = false;

  @ContentChildren(CodeComponent) codeComponents: QueryList<CodeComponent>;

  // provideSections(liveComponents: QueryList<LiveComponent>, buttonComponents: QueryList<ButtonComponent>) {
  //   this.liveComponents = liveComponents;
  //   this.buttonComponents = buttonComponents;
  // }

  set sessionId(theSessionId: string) {
    this.initialiseCodeSessionId(theSessionId)
  }

  runCode() {
    this.codeComponents.toArray().forEach(codeComponent => {
      codeComponent.runCode();
    });
    this.hasStartRun = true;

    // Instead make start components just replace outputs with the code?

    // this.liveComponents.toArray().forEach(liveComponent => {
    //   liveComponent.clearCodeOutput();
    // });

    // this.buttonComponents.toArray().forEach(buttonComponent => {
    //   buttonComponent.clearCodeOutput();
    // });
  }

  setId(id: number) {
    this.startId = id;
    this.codeComponents.toArray().forEach((codeComponent, index) => {
      codeComponent.name = '"start"_' + String(this.startId) + '_' + String(index)
    });
  }

  initialiseCodeSessionId(sessionId: string) {
    this.codeComponents.toArray().forEach((codeComponent, index) => {
      codeComponent.sessionId = sessionId
    });
  }
}
