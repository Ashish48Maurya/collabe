import { io } from 'socket.io-client';

export const initSocket = async () => {
    console.log("Call");
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io("http://localhost:8000", options);
};
