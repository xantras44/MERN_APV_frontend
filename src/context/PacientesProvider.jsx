import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('apv_token')

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config)
                
                setPacientes(data)
                console.log("Exito")
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerPacientes()
    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('apv_token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacientesActualizados)

                return {
                    msg: 'Paciente editado correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        } else {
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                setPacientes([pacienteAlmacenado, ...pacientes])

                return {
                    msg: 'Paciente guardado correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        }
    }

     const setEdicion = (paciente) => {
        setPaciente(paciente)
     }

     const eliminarPaciente = async id => {

        const confirmar = confirm('¿Seguro que quieres eliminar este paciente?')

        if(confirmar) {
            try {
                const token = localStorage.getItem('apv_token')
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizados = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizados)

                return {
                    msg: 'Paciente eliminado correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        }
     }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext