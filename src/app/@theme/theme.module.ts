import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CapitalizePipe,
    NavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    CapitalizePipe
  ]
})
export class ThemeModule { }
