
//Estilos
import React from 'react';
import './Account.css';
import Field from './Field/Field';

function Account({panelDisplay, setPanelDisplay}:any) {

    function handleCerrarSesion() {
    // Eliminar los datos almacenados en el Local Storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('Usuario');
    localStorage.removeItem('Correo');
  }

  // Obtener el valor del nombre de usuario almacenado en el Local Storage
  var nombreUsuario = localStorage.getItem('Usuario');
  var correo = localStorage.getItem('Correo');
  return (
    <div className="account-container" style={{display: panelDisplay}} onMouseLeave={() => setPanelDisplay('none')}>
      <form className="user-data">
        <img src="../img/acoountImage.png" alt="Foto de Perfil" />
        <h2>Tus datos</h2>
        <Field initValue={nombreUsuario} icons={['bx bx-edit-alt','bx bx-check']} />
        <Field initValue={correo} icons={['bx bx-edit-alt','bx bx-check']} />
        <button className='logout' onClick={handleCerrarSesion}>Cerrar Sesión</button>
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