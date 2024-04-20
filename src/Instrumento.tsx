import { useState, useEffect } from 'react';
import './ListaInstrumentos.css';

interface Instrumento {
  id: number;
  instrumento: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
}

const Instrumento = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('/instrumentos.json');
        const datos = await respuesta.json();
        setInstrumentos(datos.instrumentos);
      } catch (error) {
        console.error('Datos no obtenidos:', error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div className="instrumento"style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {instrumentos.map(instrumento => (
        <div key={instrumento.id} className="item-venta">
          <img src={"/img/" + instrumento.imagen} alt={instrumento.instrumento} />
          <div className="detalles-instrumento">
            <p style={{ fontSize: '30px' }}>{instrumento.instrumento}</p>
  
            <p style={{ fontSize: '25px', fontWeight: 'bold' }}>${instrumento.precio}</p>

            {instrumento.costoEnvio === "G" ? (
              
  <p style={{ color: 'green', fontSize: '18px' }}>
    <img src="/img/camion.png" alt="Envío Gratis" style={{ verticalAlign: 'middle', marginRight: '5px' }} /> Envío gratis a todo el paìs
  </p>
) : (
  <p style={{ color: '#e67300', fontSize: '20px' }}>
    {instrumento.costoEnvio === "G" ? (
      <span style={{fontSize: '15px'}}>
        <img src="ruta_de_la_imagen" alt="Envío Gratis" style={{ verticalAlign: 'middle', marginRight: '5px' }} />
        Envío Gratis
      </span>
    ) : (
      <span style={{ fontSize: '18px' }}>El costo de envio interior argentina: ${instrumento.costoEnvio}</span>
    )}
  </p>
)}

            
  
            <p style={{  color: 'grey', fontSize: '15px' }}>{instrumento.cantidadVendida} arituclos vendidos</p>
          </div>
        </div>
      ))}
    </div>
  );
  
  
};

export default Instrumento;
