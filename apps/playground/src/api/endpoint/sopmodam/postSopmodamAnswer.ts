import { createEndpoint } from '@/api/createEndpoint';
import { SopmodamAnswerSchema } from '@/api/endpoint/sopmodam/answerSchemas';

export const postSopmodamAnswer = createEndpoint({
  request: (roundId: number, content: string) => ({
    method: 'POST',
    url: `api/v1/sopmodam/rounds/${roundId}/answers`,
    json: { content },
  }),
  serverResponseScheme: SopmodamAnswerSchema,
});
