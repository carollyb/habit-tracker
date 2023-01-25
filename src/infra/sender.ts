import amqplib from "amqplib/callback_api";

type Message = {
  title: string;
  method: string;
  route: string;
};
export default function SendMessage(messsage: Message) {
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
      channel.sendToQueue(queue, Buffer.from(messsage.title));
      console.log("message sent");
    });
  });
}
