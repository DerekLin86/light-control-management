import { Injectable, WritableSignal, signal } from '@angular/core';

import { Zone } from '../types/zone';

export interface RECEIVE_MESSAGE {
  IPID?: any;
  buildingId: string;
  channel?: string;
  cmd: RECEIVE_CMD_TYPE;
  cmdType: 'ToServer' | 'ToAll';
  device: any;
  jsonString: string;
  processorId: string;
  value: number;
  zoneId: string;
}

export enum SEND_CMD_TYPE {
  SET_ZONE_BYPASS_ALL_SENSOR = 'setZoneBypassAllSensor',
  SET_CCMS_CONTROL_STATUS = 'setCcmsControlStatus',
  SET_ZONE_ON_OFF = 'setZoneOnOff',
  SET_ZONE_OCC_SENSOR_ENABLE = 'setZoneOccSensorEnable',
  SET_ZONE_DAYLIGHT_SENSOR_ENABLE = 'setZoneDaylightSensorEnable',
}

export enum RECEIVE_CMD_TYPE {
  ZONE_OF_OFF_STATUS = 'zoneOnOffStatus',
  ZONE_LIGHT_LEVEL_STATUS = 'zoneLightLevelStatus',
  ZONE_OCCUPIED_STATUS = 'zoneOccupiedStatus',
  ZONE_BYPASS_OCC_SENSOR_STATUS = 'zoneBypassOccSensorStatus',
  ZONE_BYPASS_DAYLIGHT_SENSOR_STATUS = 'zoneBypassDaylightSensorStatus',
  ZONE_BYPASS_ALL_SENSOR = 'zoneBypassAllSensorStatus',
}

export interface CMD {
  cmd: string;
  buildingId: number;
  processorId: number;
  zoneId: string;
  value: string | number;
  jsonString: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  protected readonly URL = 'ws://103.247.167.186:5004/wsapi';

  readonly zoneOnOffStatusListensor: WritableSignal<RECEIVE_MESSAGE | undefined> =
    signal(undefined);
  readonly bypassAllSensorListensor: WritableSignal<RECEIVE_MESSAGE | undefined> =
    signal(undefined);
  readonly lightLevelStatusListensor: WritableSignal<RECEIVE_MESSAGE | undefined> =
    signal(undefined);
  readonly zoneOccupiedStatusListensor: WritableSignal<RECEIVE_MESSAGE | undefined> =
    signal(undefined);
  readonly zoneBypassOccSensorStatusListensor: WritableSignal<RECEIVE_MESSAGE | undefined> =
    signal(undefined);
  readonly zoneBypassDaylightSensorStatusListensor: WritableSignal<RECEIVE_MESSAGE | undefined> =
    signal(undefined);

  private messagesSignal: WritableSignal<string[]> = signal([]);

  private socket: WebSocket | undefined;

  constructor() {}

  connect() {
    this.socket = new WebSocket(this.URL);

    this.socket.onopen = () => {
      console.info('Connect to Web Socket');
    };

    this.socket.onmessage = event => {
      console.log('Message received:', JSON.parse(event.data));

      this.categorizeReceiveMsg(JSON.parse(event.data));

      this.messagesSignal.update(msgs => [...msgs, event.data]);
    };

    this.socket.onerror = error => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  // Actions: Receive Message

  categorizeReceiveMsg(receiveMsg: RECEIVE_MESSAGE) {
    switch (receiveMsg.cmd) {
      case RECEIVE_CMD_TYPE.ZONE_OF_OFF_STATUS:
        this.zoneOnOffStatusListensor.set(receiveMsg);
        break;
      case RECEIVE_CMD_TYPE.ZONE_OCCUPIED_STATUS:
        this.zoneOccupiedStatusListensor.set(receiveMsg);
        break;
      case RECEIVE_CMD_TYPE.ZONE_BYPASS_DAYLIGHT_SENSOR_STATUS:
        this.zoneBypassDaylightSensorStatusListensor.set(receiveMsg);
        break;
      case RECEIVE_CMD_TYPE.ZONE_BYPASS_OCC_SENSOR_STATUS:
        this.zoneBypassOccSensorStatusListensor.set(receiveMsg);
        break;
      case RECEIVE_CMD_TYPE.ZONE_BYPASS_ALL_SENSOR:
        this.bypassAllSensorListensor.set(receiveMsg);
        break;
      case RECEIVE_CMD_TYPE.ZONE_LIGHT_LEVEL_STATUS:
        this.lightLevelStatusListensor.set(receiveMsg);
        break;
      default:
        break;
    }
  }

  // Actions: Bypass

  updateBypassStatus(zoneData: any) {
    const cmd: CMD = {
      cmd: SEND_CMD_TYPE.SET_ZONE_BYPASS_ALL_SENSOR,
      buildingId: zoneData.buildingId,
      processorId: 0,
      zoneId: zoneData.zoneId ?? '',
      value: JSON.stringify(zoneData.bypassOccupancySensor),
      jsonString: JSON.stringify(zoneData),
    };

    this.sendMessage(JSON.stringify(cmd));
  }

  // Actions: CCMS

  updateCcmsStatus(zoneData: Zone) {
    const cmd: CMD = {
      cmd: SEND_CMD_TYPE.SET_CCMS_CONTROL_STATUS,
      buildingId: zoneData.buildingId,
      processorId: 0,
      zoneId: zoneData.zoneId ?? '',
      value: JSON.stringify(zoneData.isOn),
      jsonString: JSON.stringify(zoneData),
    };

    this.sendMessage(JSON.stringify(cmd));
  }

  // Action: CLMS

  updateZoneOnOff(zoneData: Zone) {
    const cmd: CMD = {
      cmd: SEND_CMD_TYPE.SET_ZONE_ON_OFF,
      buildingId: zoneData.buildingId,
      processorId: zoneData.processorId,
      zoneId: zoneData.zoneId ?? '',
      value: JSON.stringify(zoneData.isOn),
      jsonString: JSON.stringify(zoneData),
    };

    this.sendMessage(JSON.stringify(cmd));
  }

  // Actions: Occ

  updateZoneOccSensorEnable(zoneData: Zone) {
    const cmd: CMD = {
      cmd: SEND_CMD_TYPE.SET_ZONE_OCC_SENSOR_ENABLE,
      buildingId: zoneData.buildingId,
      processorId: zoneData.processorId,
      zoneId: zoneData.zoneId ?? '',
      value: Number(zoneData.OccSensorEnable),
      jsonString: JSON.stringify(zoneData),
    };

    this.sendMessage(JSON.stringify(cmd));
  }

  // Acctions: Daylight

  updateZoneDaylightSensorEnable(zoneData: Zone) {
    const cmd: CMD = {
      cmd: SEND_CMD_TYPE.SET_ZONE_DAYLIGHT_SENSOR_ENABLE,
      buildingId: zoneData.buildingId,
      processorId: zoneData.processorId,
      zoneId: zoneData.zoneId ?? '',
      value: Number(zoneData.DaylightSensorEnable),
      jsonString: JSON.stringify(zoneData),
    };

    this.sendMessage(JSON.stringify(cmd));
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  }

  close(): void {
    this.socket?.close();
  }
}
