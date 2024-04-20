import { useState, useEffect } from 'react';
import './ListaInstrumentos.css'; // Estilo personalizado

interface Instrumento {
  id: number;
  instrumento: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
}

const InstrumentoList = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await fetch('/instrumentos.json'); // Obtener datos de un archivo JSON
        const datos = await respuesta.json();
        setInstrumentos(datos.instrumentos);
      } catch (error) {
        console.error('Datos no obtenidos:', error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div className="instrumento"> {/* Contenedor principal */}
      {instrumentos.map(instrumento => (
        <div key={instrumento.id} className="item-venta"> {/* Elemento de venta */}
          <img src={"/img/" + instrumento.imagen} alt={instrumento.instrumento} /> {/* Imagen del instrumento */}
          <div className="detalles-instrumento"> {/* Detalles del instrumento */}
            <p>{instrumento.instrumento}</p> {/* Nombre del instrumento */}
            <p>${instrumento.precio}</p> {/* Precio del instrumento */}

            {instrumento.costoEnvio === "G" ? ( // Mostrar mensaje de envío gratis
              <p style={{ color: 'green' }}>Envío gratis a todo el país</p>
            ) : (
              <p style={{ color: '#e67300' }}>El costo de envío interior Argentina: ${instrumento.costoEnvio}</p>
            )}

            <p>{instrumento.cantidadVendida} artículos vendidos</p> {/* Cantidad vendida */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstrumentoList;