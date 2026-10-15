import { SopmodamAnswerSchema } from '@/api/endpoint/sopmodam/answerSchemas';
import { createEndpoint } from '@/api/typedAxios';

export const postSopmodamAnswer = createEndpoint({
  request: (roundId: number, content: string) => ({
    method: 'POST',
    url: `api/v1/sopmodam/rounds/${roundId}/answers`,
    data: { content },
  }),
  serverResponseScheme: SopmodamAnswerSchema,
});
