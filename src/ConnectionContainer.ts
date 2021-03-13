import {Connection} from 'typeorm';

export default class ConnectionContainer {
    public static connection: Connection;
}
