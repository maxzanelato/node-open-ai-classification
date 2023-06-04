import fs from 'fs';
import { parse } from 'json2csv';

import OpenAiService from './OpenAiService';

import { logConsole } from '../utils/logUtil';
import { convertCSVFileToJSONObject } from '../utils/csvUtils';

import { CSV_PATH } from '../constants/CSV_PATH';

import { IAiIsRelatedToParams } from '../interfaces/IAiIsRelatedToParams';

export default class AiService {
  #openAiService: OpenAiService;
  #result: Array<IAiIsRelatedToParams>;

  constructor() {
    this.#result = new Array();
    this.#openAiService = new OpenAiService();
  }

  public async isRelatedTo() {
    const tickets = await convertCSVFileToJSONObject(
      CSV_PATH.CSV_FILE_TO_READ || ''
    );

    for (const ticket of tickets) {
      const firstMessage = ticket.first_message;
      const subject = ticket.subject;

      try {
        const completion = await this.#openAiService.isRelatedTo({
          firstMessage,
          subject,
        });

        const result = (completion.choices[0] as any).message.content;

        this.#result.push({
          firstMessage,
          subject,
          result,
        });

        // logConsole(subject, firstMessage, result);
      } catch (error: any) {
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(
            `Error with OpenAI API request: ${error.message}`
          );
        }
      }
    }

    const csv = parse(this.#result);

    logConsole('Writing data on disk...');
    fs.writeFileSync(CSV_PATH.PLACE_TO_SAVE_CSV || '', csv);
    logConsole('CSV created!');
  }
}
