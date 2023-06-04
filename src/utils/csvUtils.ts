import csvToJson from 'csvtojson';

import ITicketFromCSV from '../interfaces/ITicketFromCSV';

export const convertCSVFileToJSONObject = async (
  csvFileToRead: string
): Promise<Array<ITicketFromCSV>> => {
  const json = await csvToJson().fromFile(csvFileToRead);
  const jsonString = JSON.stringify(json, null, 2);

  const tickets = JSON.parse(jsonString) as Array<ITicketFromCSV>;

  return tickets;
};
