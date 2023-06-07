import { Configuration, OpenAIApi } from 'openai';

import { IAiIsRelatedToParams } from '../interfaces/IAiIsRelatedToParams';
import { AI_API } from '../constants/AI_API';

export default class OpenAiService {
  private buildContent({
    firstMessage,
    subject,
  }: IAiIsRelatedToParams) {
    const query = `Verifique se o texto "${firstMessage}" está associado ao motivo de contato descrito dentro do texto "${subject}". Caso esteja associado, retorne a palavra SIM; e caso não esteja associado, retorne NAO.`;

    return query;
  }

  public async isRelatedTo(params: IAiIsRelatedToParams) {
    const configuration = new Configuration({
      apiKey: AI_API.AI_API_KEY,
      basePath: AI_API.AI_API_URL,
    });

    const openai = new OpenAIApi(configuration);

    const { data } = await openai.createCompletion(
      {
        model: 'gpt-4',
        temperature: 0.6,
        messages: [
          { role: 'user', content: this.buildContent(params) },
        ],
      } as any,
      {
        headers: {
          'X-Requester-Token': AI_API.AI_API_KEY || '',
        },
      }
    );

    return data;
  }
}
