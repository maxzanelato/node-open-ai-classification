# CLASSIFICATION API USING AI
It's a **Node.js app** that connects to **Open AI API** and verify the **correlation** between 2 subjects.

IMPORTANT: This project is using sandbox API from iFood.

## Endpoints:
* `/relatedTo`: checks if 2 subjects are correlated;
* `/relatedToFromCSV`: read from a CSV file and, for each row, checks if the first column is correlated to second. The result will be added in a third column and exported to a CSV file.

## TECHNOLOGIES
* **csvtojson**: converts CSV to JSON;
* **express**: framework to build a web app;
* **json2csv**: converts json to CSV;
* **openai**: lib to connect to Open AI API;
* **ts-node-dev**: server to run the app;
* **POSTMAN**: API tester.

## ENV VARIABLES
* **PORT**: server port to run the app;
* **AI_API_URL**: URL to connect to Open AI;
* **OPENAI_API_KEY**: access token to connect to Open AI;
* **CSV_FILE_TO_READ**: CSV file path to read; 
* **PLACE_TO_SAVE_CSV**: CSV file path to save.

## REQUESTS
The POSTMAN requests are in the POSTMAN_REQUESTS folder.
