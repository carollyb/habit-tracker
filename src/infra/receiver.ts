import amqplib from "amqplib/callback_api";

export default function ReceiveMessage() {
  amqplib.connect("amqp://localhost", (connectionError, connection) => {
    if (connectionError) {
      throw connectionError;
    }
    connection.createChannel((channelError, channel) => {
      if (channelError) {
        throw channelError;
      }
      const queue = "test";
      channel.assertQueue(queue);
      channel.consume(queue, (msg) => {
        if (msg) {
          const log = msg.content.toString();
          console.log(`message received: ${log}`);
        }
      }),
        {
          noAck: true,
        };
    });
  });
}
