import { createEndpoint } from '@/api/createEndpoint';
import { SopmodamAnswerSchema } from '@/api/endpoint/sopmodam/answerSchemas';

export const putSopmodamAnswer = createEndpoint({
  request: (answerId: number, content: string) => ({
    method: 'PUT',
    url: `api/v1/sopmodam/answers/${answerId}`,
    json: { content },
  }),
  serverResponseScheme: SopmodamAnswerSchema,
});
