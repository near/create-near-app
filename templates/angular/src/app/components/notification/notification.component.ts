import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

import getConfig from '../../../config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

@Component({
  selector: 'app-notification[accountId][contractId]',
  templateUrl: './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {
  @Input() accountId: string
  @Input() contractId: string
  urlPrefix = `https://explorer.${networkId}.near.org/accounts`

  get accountUrl(): string {
    return `${this.urlPrefix}/${this.accountId}`
  }

  get contractUrl(): string {
    return `${this.urlPrefix}/${this.contractId}`
  }
}
