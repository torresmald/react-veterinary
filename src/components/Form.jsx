import React from 'react';
import { useEffect, useState } from 'react';
import Error from './Error';
function Form({pacientes, setPacientes, paciente, setPaciente}) {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
        
    }, [paciente]);

    const generarId =  () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setError(true);
            return;
        }
        setError(false);
        const objetoPaciente ={
            nombre, propietario, email, fecha, sintomas
        }

        if(paciente.id){
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map((pacienteState) => paciente.id === pacienteState.id ? objetoPaciente : pacienteState);
            setPacientes(pacientesActualizados);
            setPaciente({})
        }else{
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente])

        }
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-center text-3xl">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center">Añade Pacientes y <span className="text-indigo-600 font-bold"> Administralos</span></p>
            <form className="bg-white shadow-md rounded-lg py-10 px-5 mt-10 mb-10" onSubmit={handleSubmit}>

                {error && <Error 
                        mensaje='Todos los campos obligatorios'

                />}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 font-bold uppercase">Nombre Mascota</label>
                    <input type="text" placeholder='Nombre de Mascota' id='mascota' className="border-2 w-full placeholder-gray-400 rounded-md p-2 mt-2" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 font-bold uppercase">Nombre Propietario</label>
                    <input type="text" placeholder='Nombre de Propietario' id='propietario' className="border-2 w-full placeholder-gray-400 rounded-md p-2 mt-2" value={propietario} onChange={(event) => setPropietario(event.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 font-bold uppercase">Email</label>
                    <input type="email" placeholder='Email Contacto' id='email' className="border-2 w-full placeholder-gray-400 rounded-md p-2 mt-2" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 font-bold uppercase">Alta</label>
                    <input type="date" id='alta' className="border-2 w-full rounded-md p-2 mt-2" value={fecha} onChange={(event) => setFecha(event.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 font-bold uppercase">Sintomas Mascota</label>
                    <textarea id="sintomas" placeholder='Describe los sintomas' className="border-2 w-full rounded-md p-2 mt-2" value={sintomas} onChange={(event) => setSintomas(event.target.value)}></textarea>
                </div>
                <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}/>
            </form>
        </div>
    );
}

export default Form;