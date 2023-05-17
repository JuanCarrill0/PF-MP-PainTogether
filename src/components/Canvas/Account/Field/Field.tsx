import { useState } from 'react';

//Estilos
import './Field.css';

function Field({initValue, url, icons}:any) {
  const [value, setValue] = useState(initValue || url);
  const [enable, setEnable] = useState<'auto' | 'none'>('none');

  const saveEdit = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
  const enableOrCopy = () => initValue ? setEnable('auto') : navigator.clipboard.writeText(value);
  const changeValueOrOpenLink = () => initValue ? setEnable('none') : window.open(value, '_blank');

  return (
    <div className="field">
      <input type="text" value={value} onChange={saveEdit} style={{pointerEvents: enable}} />
      <i className={icons[0]} onClick={enableOrCopy}></i>
      <i className={icons[1]} onClick={changeValueOrOpenLink}></i>
    </div>
  );
}

export default Field;