
//Estilos
import './Account.css';
import Field from './Field/Field';

function Account({panelDisplay, setPanelDisplay}:any) {
  return (
    <div className="account-container" style={{display: panelDisplay}} onMouseLeave={() => setPanelDisplay('none')}>
      <form className="user-data">
        <img src="../img/acoountImage.png" alt="Foto de Perfil" />
        <h2>Tus datos</h2>
        <Field initValue={'Nombre de Usuario (reemplazar)'} icons={['bx bx-edit-alt','bx bx-check']} />
        <Field initValue={'Correo electrónico (reemplazar)'} icons={['bx bx-edit-alt','bx bx-check']} />
        <Field initValue={'Contraseña (reemplazar)'} icons={['bx bx-edit-alt','bx bx-check']} />
      </form>
      <div className="url-canvas">
        <h2>Proyectos</h2>
        <Field url={'url de nuestro canvas'} icons={['bx bx-copy','bx bx-link-external']} />
        <Field url={'url de otro canvas'} icons={['bx bx-copy','bx bx-link-external']} />
        <Field url={'url de otro canvas'} icons={['bx bx-copy','bx bx-link-external']} />
        <Field url={'https://www.google.com/'} icons={['bx bx-copy','bx bx-link-external']} />
      </div>
    </div>
  );
}

export default Account;