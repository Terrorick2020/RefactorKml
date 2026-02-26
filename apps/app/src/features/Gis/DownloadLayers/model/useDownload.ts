import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { FolderContext } from '@/entities';
import { selectGisItemList } from '@/shared/store';
import { zipSync } from "fflate";


export const useDownLoad = (value: number) => {
  const context = useContext(FolderContext);
  const [load, setLoad] = useState<boolean>(false);
  const layersList = useSelector(selectGisItemList);

  const onDownload = async () => {
    if(!context.value.current) return;
    setLoad(true);

    const folders: Record<string, Record<string, Uint8Array>> = {};

    for (const folderName in context.value.current) {
        const files = context.value.current[folderName];
        folders[folderName] = {};

        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            folders[folderName][file.name] = new Uint8Array(arrayBuffer);
        }
    }

    const zipped = zipSync(folders);
    const blob = new Blob([zipped], { type: "application/zip" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'archive.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
    setLoad(false);
  };

  const isDisabled = !layersList.length;

  return { load, isDisabled, onDownload }
}
