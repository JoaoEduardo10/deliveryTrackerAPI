/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import fs from 'fs/promises';
import { Internal_Server_Error } from './errors/api-error';

class Jsonfiles {
  static async read({ jsonFilePath }: { jsonFilePath: string }) {
    try {
      const data = await fs.readFile(jsonFilePath, 'utf8');

      const replacedData = data.replace(
        /\${(.*?)}/g,
        (match, environmentName) => {
          const envVar = process.env[environmentName];
          return envVar ?? match;
        },
      );

      const jsonData = JSON.parse(replacedData);

      return jsonData;
    } catch (error: any) {
      throw new Internal_Server_Error('Erro ao ler o arquivo ' + error.message);
    }
  }
}

export { Jsonfiles };
