import { chatbotPrompt } from '@/helpers/constants/chatbot-prompt';
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from '@/libs/openai-stream';
import { MessageArraySchema } from '@/libs/validators/messasge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessage = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[] = parsedMessage.map((message) => ({
    role: message.isUserMessage ? 'user' : 'system',
    content: message.text,
  }));

  outboundMessages.unshift({
    role: 'system',
    content: chatbotPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
