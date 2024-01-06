import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
// @Injectable()
// export class MyService {
  export const runBashScript = (
    schemaName: string,
    migrationName: string,
  ): Promise<void> => {
    // Replace 'your-script.sh' with the actual name of your bash script
    try{
 const scriptPath = './migrate.bash';

    return new Promise((resolve, reject) => {
      exec(
        `bash ${scriptPath} ${schemaName} ${migrationName}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing bash script: ${error.message}`);
            reject(error);
          } else {
            console.log(`Script output: ${stdout}`);
            resolve();
          }
        },
      );
    });
    }catch(error) {
      console.log("error",error);
    }
   
  }
// }
