import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './User';

@Component({
  selector: 'storybook-header',
  template: `
  <header>
    <div class="wrapper">
      <h1>Wolox</h1>
      <div>
        <div *ngIf="user">
          <span class="welcome">
            Welcome, <b>{{ user.name }}</b
            >!
          </span>
          <storybook-button
            *ngIf="user"
            size="small"
            (onClick)="onLogout.emit($event)"
            label="Log out"
          ></storybook-button>
        </div>
        <div *ngIf="!user">
          <storybook-button
            *ngIf="!user"
            size="small"
            class="margin-left"
            (onClick)="onLogin.emit($event)"
            label="Log in"
          ></storybook-button>
          <storybook-button
            *ngIf="!user"
            primary
            size="small"
            primary="true"
            class="margin-left"
            (onClick)="onCreateAccount.emit($event)"
            label="Sign up"
          ></storybook-button>
        </div>
      </div>
    </div>
  </header>`,
  styleUrls: ['./header.scss'],
})
export default class HeaderComponent {
  @Input()
  user: User | null = null;

  @Output()
  onLogin = new EventEmitter<Event>();

  @Output()
  onLogout = new EventEmitter<Event>();

  @Output()
  onCreateAccount = new EventEmitter<Event>();
}
