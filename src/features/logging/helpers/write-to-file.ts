import * as fs from "node:fs";
import * as path from "node:path";

export function writeToFile(
  filePath: string,
  data: string,
  maxFileSize: number,
) {
  checkFile(filePath, maxFileSize);
  fs.appendFileSync(filePath, data);
}

function checkFile(filePath: string, maxFileSize: number) {
  if (!fs.existsSync(filePath)) {
    createFile(filePath);
  } else {
    checkSize(filePath, maxFileSize);
  }
}

function checkSize(filePath: string, maxFileSize: number) {
  const fileStat = fs.statSync(filePath);

  if (fileStat.size > maxFileSize) {
    rotateLogFile(filePath);
    createFile(filePath);
  }
}

function createFile(filePath: string) {
  const logDir = path.dirname(filePath);
  fs.mkdirSync(logDir, { recursive: true });
}

function rotateLogFile(filePath: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const rotatedFile = `${filePath}.${timestamp}`;

  fs.renameSync(filePath, rotatedFile);
}
