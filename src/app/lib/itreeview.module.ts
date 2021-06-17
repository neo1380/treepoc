import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown.directive';
import { DropdownMenuDirective } from './directives/dropdown-menu.directive';
import { DropdownToggleDirective } from './directives/dropdown-toggle.directive';
import { DropdownTreeviewComponent } from './components/dropdown-treeview/dropdown-treeview.component';
import { TreeviewComponent } from './components/itreeview/itreeview.component';
import { TreeviewItemComponent } from './components/itreeview-item/itreeview-item.component';
import { TreeviewPipe } from './pipes/itreeview.pipe';
import { TreeviewI18n, DefaultTreeviewI18n } from './models/itreeview-i18n';
import { ITreeviewConfig } from './models/itreeview-config';
import { TreeviewEventParser, DefaultTreeviewEventParser } from './helpers/itreeview-event-parser';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [
    TreeviewComponent,
    TreeviewItemComponent,
    TreeviewPipe,
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    DropdownTreeviewComponent
  ], exports: [
    TreeviewComponent,
    TreeviewPipe,
    DropdownTreeviewComponent
  ]
})
export class TreeviewModule {
  static forRoot(): ModuleWithProviders<TreeviewModule> {
    return {
      ngModule: TreeviewModule,
      providers: [
        ITreeviewConfig,
        { provide: TreeviewI18n, useClass: DefaultTreeviewI18n },
        { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
      ]
    };
  }
}
