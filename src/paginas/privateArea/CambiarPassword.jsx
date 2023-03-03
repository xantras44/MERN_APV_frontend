import { useState } from "react"
import AdminNav from "../../components/AdminNav"
import Alerta from "../../components/Alerta"
import useAuth from "../../hooks/useAuth"

const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: '',
        pwd_nuevo_rep: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()
        
        if(Object.values(password).some( campo => campo === '' )) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        
        if(password.pwd_nuevo !== password.pwd_nuevo_rep) {
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return
        }

        if(password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener un mínimo de 6 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        const respuesta = await guardarPassword(password)

        setAlerta(respuesta)
    }

    const {msg} = alerta

    return (
        <>
            <AdminNav/>

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu {''}
                <span className="text-indigo-600 font-bold">Password aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    <form onSubmit={handleSubmit}>
                        {msg && <Alerta alerta={alerta}/>}
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input
                                type="password"
                                placeholder="Escribe tu password actual"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Password Nueva</label>
                            <input
                                type="password"
                                placeholder="Escribe tu nueva password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_nuevo"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Repite tu Password Nueva</label>
                            <input
                                type="password"
                                placeholder="Repite tu nueva password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_nuevo_rep"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Actualizar Password"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CambiarPassword