import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-server-status',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerStatusComponent {
  private readonly websocketServer = inject(WebsocketService);

  protected readonly isOn = computed(() => {
    return this.websocketServer.isOn();
  });

  clickButton() {
    if (!this.isOn()) {
      this.websocketServer.connect();
    }
  }
}
