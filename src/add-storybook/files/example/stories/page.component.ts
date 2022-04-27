import { Component } from '@angular/core';
import { User } from './User';

@Component({
  selector: 'storybook-page',
  template: `<article>
    <storybook-header
      [user]="user"
      (onLogout)="doLogout()"
      (onLogin)="doLogin()"
      (onCreateAccount)="doCreateAccount()"
    ></storybook-header>
    <section>
      <h2>Wolox Storybooks</h2>
      <p>
        This stories have been generated with
        <a href="https://github.com/Wolox/angular-bootstrap" target="_blank" rel="noopener noreferrer">
          <strong>angular-bootstrap</strong> 🎨 📦️
        </a>
      </p>
      <div class="tip-wrapper">
        <span class="tip">Tip</span> Adjust the width of the canvas with the
        <svg width="10" height="10" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path
              d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
              id="a"
              fill="#999"
            />
          </g>
        </svg>
        Viewports addon in the toolbar
      </div>
    </section>
  </article>`,
  styleUrls: ['./page.scss'],
})
export default class PageComponent {
  user: User | null = null;

  doLogout() {
    this.user = null;
  }

  doLogin() {
    this.user = { name: 'Jane Doe' };
  }

  doCreateAccount() {
    this.user = { name: 'Jane Doe' };
  }
}
