import { SopmodamAnswerSchema } from '@/api/endpoint/sopmodam/answerSchemas';
import { createEndpoint } from '@/api/typedAxios';

export const putSopmodamAnswer = createEndpoint({
  request: (answerId: number, content: string) => ({
    method: 'PUT',
    url: `api/v1/sopmodam/answers/${answerId}`,
    data: { content },
  }),
  serverResponseScheme: SopmodamAnswerSchema,
});
