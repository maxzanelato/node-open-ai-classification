import fs from 'fs';
import moment from 'moment';
import { parse } from 'json2csv';
import { performance } from 'perf_hooks';

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
    const t0 = performance.now();

    logConsole('Initialed the process...');

    const tickets = await convertCSVFileToJSONObject(
      CSV_PATH.CSV_FILE_TO_READ || ''
    );

    for (const ticket of tickets) {
      const subject = ticket.subject;
      const orderId = ticket.order_id;
      const firstMessage = ticket.first_message;

      const row = {
        orderId,
        subject,
        firstMessage,
      };

      try {
        const completion = await this.#openAiService.isRelatedTo(row);

        const result = (completion.choices[0] as any).message.content;

        this.#result.push({
          ...row,
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

    const t1 = performance.now();
    const duration = moment.utc(t1 - t0).format('HH:mm:ss.SSS');

    logConsole('Writing data on disk...');
    fs.writeFileSync(CSV_PATH.PLACE_TO_SAVE_CSV || '', csv);
    logConsole('CSV created!', `It has took ${duration}`);
  }
}
