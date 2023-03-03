import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../../components/Alerta"
import clienteAxios from "../../config/axios"

const NuevaPassword = () => {

  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordCambiada, setPasswordCambiada] = useState(false);

  const params = useParams();
  const {token} = params;

  useEffect(() => {
    const validarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setTokenValido(true);
        setAlerta({
          msg: "Coloca tu nuevo password"
        });
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true
        });
      }
    }
    validarToken();
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if([password, repetirPassword].includes('')) {
      setAlerta({msg: "Todos los campos son obligatorios", error: true});
      return
    }

    if(password !== repetirPassword) {
      setAlerta({msg: "Las contraseñas no coinciden", error: true});
      return
    }

    if(password.length < 6 || repetirPassword.length < 6) {
      setAlerta({msg: "Introduce un mínimo de 6 caracteres", error: true})
      return
    }

    setAlerta({})

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, {password});
      setPasswordCambiada(true)
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error: true})
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div className="w-auto">
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no pierdas acceso a {''}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow px-5 py-10 rounded-xl bg-white">
        
          {msg && <Alerta alerta={alerta} />}
        
          {tokenValido && !passwordCambiada && (
              <>
                  <form onSubmit={handleSubmit}>
                      <div className="my-5">
                          <label className="uppercase text-gray-600 block text-xl font-bold">Nueva Password</label>
                          <input 
                              type="password" 
                              placeholder="Tu nueva password" 
                              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                            />
                      </div>

                      <div className="my-5">
                          <label className="uppercase text-gray-600 block text-xl font-bold">Repite password</label>
                          <input 
                              type="password" 
                              placeholder="Repite tu password" 
                              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                              value={repetirPassword}
                              onChange={e => setRepetirPassword(e.target.value)}
                            />
                      </div>

                      <input 
                          type="submit" 
                          value="Guardar nueva password" 
                          className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 cursor-pointer hover:bg-indigo-800 md:w-auto" />
                  </form>

                  
              </>
          )}

          {passwordCambiada && 
              <Link className='block text-center my-5 text-gray-500' to="/">Inicia Sesión</Link>
          }
      </div>
    </>
  )
}

export default NuevaPassword