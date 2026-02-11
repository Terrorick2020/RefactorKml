import { dirSystemLayout } from '@/shared/config';
import type { ChangeEvent } from 'react';
import type { IFileTree } from '@/shared/types';


function isValidDirName(dirName: string): boolean {
  for(const item of dirSystemLayout) {
    if(item.name !== dirName) continue;
    return true;
  }
  
  return false;
}

function isValidFileExpansion(dirName: string, fileName: string): boolean {
  const targetDir = dirSystemLayout.find(item => item.name === dirName);
  if(!targetDir) return false;

  const parts = fileName.split('.');
  const fileExp = '.' + parts[parts.length - 1];

  return targetDir.targetFileType.includes(fileExp);
}

export function onFileChange(event: ChangeEvent<HTMLInputElement>): void {
  const files = Array.from(event.target.files ?? []);
  const tree: IFileTree = {};

  for(const file of files) {
    const pathParts = file.webkitRelativePath.split('/');
    const dirName = `/${pathParts[1]}`;

    if(!tree[dirName]) {
      const dirIsValid = isValidDirName(dirName);
      if(!dirIsValid) continue;
      tree[dirName] = [];
    }

    const fileIsValid = isValidFileExpansion(dirName, file.name);
    if(!fileIsValid) continue;

    tree[dirName].push(file);
  }

  if(Object.keys(tree).length !== dirSystemLayout.length) {
    alert("Неправильный формат содержимого папки!");
  }

  event.target.value = '';
}
