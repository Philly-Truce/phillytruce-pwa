declare global {
  namespace PrismaJson {
    type Message = {
      _id: string;
      from: string;
      to: string;
      message_content: Date;
      created_at: Date;
    };

    type Messages = Message[] | null;
  }
}
