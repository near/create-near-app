import { Component, Inject, OnInit } from '@angular/core'

import { login, logout, onSubmit } from '../utils'
import { WINDOW } from './services/window.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  greeting: string
  newGreeting: string
  showNotification = false

  get accountId(): string {
    return this.window.walletConnection.getAccountId()
  }

  get signedIn(): boolean {
    return this.window.walletConnection.isSignedIn()
  }

  get contractId(): string {
    return this.window.contract.contractId
  }

  get buttonDisabled(): boolean {
    const newGreeting = this.newGreeting?.trim()
    return !newGreeting || newGreeting === this.greeting
  }

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit(): void {
    this.fetchGreeting()
  }

  login(): void {
    login()
  }

  logout(): void {
    logout()
  }

  async fetchGreeting(): Promise<void> {
    if (this.signedIn) {
      this.greeting = this.newGreeting = await this.window.contract.getGreeting({ accountId: this.accountId })
    }
  }

  async onSubmit(event): Promise<void> {
    // fire frontend-agnostic submit behavior, including data persistence
    // look in utils.js to see how this updates data on-chain!
    await onSubmit(event)

    // update local `greeting` variable to match persisted value
    this.greeting = this.newGreeting

    // show notification
    this.showNotification = true

    // remove notification again after css animation completes
    // this allows it to be shown again next time the form is submitted
    setTimeout(() => {
      this.showNotification = false
    }, 11000)
  }
}
