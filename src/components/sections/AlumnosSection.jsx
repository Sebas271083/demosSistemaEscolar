import { useState } from 'react';
import { Plus, Search, Eye, EyeOff, RefreshCw, Pencil, Power, UserPlus } from 'lucide-react';
import Modal from '../shared/Modal';
import { alumnos as alumnosIniciales } from '../../data/mockData';

const cursosOpc = [
  { id: 1, nombre: '3° Año A' }, { id: 2, nombre: '3° Año B' },
  { id: 3, nombre: '4° Año A' }, { id: 4, nombre: '2° Año A' },
];

const formInicial = { nombre: '', apellido: '', email: '', telefono: '', curso_id: '', fecha_nacimiento: '', grado: '' };

export default function AlumnosSection() {
  const [alumnos, setAlumnos] = useState(
    alumnosIniciales.map((a) => {
      const [apellido, nombre] = a.nombre.split(' ', 2);
      return { ...a, apellido: apellido || '', nombre: nombre || a.nombre, activo: 1, grado: a.año, curso_nombre: a.año };
    })
  );
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [cursoFiltro, setCursoFiltro] = useState('');
  const [mostrarInactivos, setMostrarInactivos] = useState(false);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAccesoAbierto, setModalAccesoAbierto] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState(formInicial);
  const [formAcceso, setFormAcceso] = useState({ modo: 'nuevo', nombre: '', email: '', password: '' });

  const filtrados = alumnos.filter((a) => {
    const texto = `${a.nombre} ${a.apellido} ${a.email} ${a.curso_nombre}`.toLowerCase();
    if (busqueda && !texto.includes(busqueda.toLowerCase())) return false;
    if (estadoFiltro === 'activo' && a.activo !== 1) return false;
    if (estadoFiltro === 'inactivo' && a.activo === 1) return false;
    if (cursoFiltro && String(a.curso_id) !== cursoFiltro) return false;
    if (!mostrarInactivos && a.activo !== 1) return false;
    return true;
  });

  const abrirModalNuevo = () => { setAlumnoEditando(null); setForm(formInicial); setModalAbierto(true); };
  const abrirModalEditar = (al) => {
    setAlumnoEditando(al);
    setForm({ nombre: al.nombre, apellido: al.apellido, email: al.email || '', telefono: al.telefono || '', curso_id: String(al.curso_id || ''), fecha_nacimiento: al.fecha_nacimiento || '', grado: al.grado || '' });
    setModalAbierto(true);
  };
  const cerrarModal = () => { setModalAbierto(false); setAlumnoEditando(null); setForm(formInicial); };

  const guardarAlumno = async (e) => {
    e.preventDefault();
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 500));
    if (alumnoEditando) {
      setAlumnos((prev) => prev.map((a) => a.id === alumnoEditando.id ? { ...a, ...form, curso_nombre: cursosOpc.find((c) => String(c.id) === form.curso_id)?.nombre || a.curso_nombre } : a));
    } else {
      const nuevo = { ...form, id: Date.now(), activo: 1, initials: `${form.nombre[0] || ''}${form.apellido[0] || ''}`, curso_nombre: cursosOpc.find((c) => String(c.id) === form.curso_id)?.nombre || '' };
      setAlumnos((prev) => [...prev, nuevo]);
    }
    setGuardando(false);
    cerrarModal();
  };

  const cambiarEstado = (alumno) => {
    setAlumnos((prev) => prev.map((a) => a.id === alumno.id ? { ...a, activo: a.activo === 1 ? 0 : 1 } : a));
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Alumnos</h1>
          <p className="mt-1 text-slate-500">Gestion de alumnos y asignacion a cursos.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:flex">
          <button
            onClick={() => setMostrarInactivos(!mostrarInactivos)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            {mostrarInactivos ? <EyeOff size={18} /> : <Eye size={18} />}
            {mostrarInactivos ? 'Ocultar inactivos' : 'Mostrar inactivos'}
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <RefreshCw size={18} />
            Actualizar
          </button>
          <button
            onClick={abrirModalNuevo}
            className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition md:col-auto"
          >
            <Plus size={18} />
            Nuevo alumno
          </button>
        </div>
      </section>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Listado de alumnos</h2>
            <p className="text-sm text-slate-500">{filtrados.length} alumnos encontrados</p>
          </div>
        </div>

        {/* FilterPanel colapsable */}
        <div className="mb-5 rounded-2xl border border-slate-200 overflow-hidden">
          <button
            onClick={() => setFiltrosAbiertos(!filtrosAbiertos)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <span>Filtros operativos</span>
            <span className={`transition-transform duration-200 ${filtrosAbiertos ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {filtrosAbiertos && (
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Buscar alumno</label>
                  <div className="relative mt-2">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Nombre, apellido, email o curso"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Estado</label>
                  <select
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Todos</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Curso</label>
                  <select
                    value={cursoFiltro}
                    onChange={(e) => setCursoFiltro(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Todos</option>
                    {cursosOpc.map((c) => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['ID', 'Apellido', 'Nombre', 'Email', 'Curso', 'Grado', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((al) => (
                <tr key={al.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-500">{al.id}</td>
                  <td className="px-5 py-4 font-medium text-slate-900">{al.apellido}</td>
                  <td className="px-5 py-4 text-slate-700">{al.nombre}</td>
                  <td className="px-5 py-4 text-slate-500">{al.email}</td>
                  <td className="px-5 py-4 text-slate-700">{al.curso_nombre || al.año || '-'}</td>
                  <td className="px-5 py-4 text-slate-500">{al.grado || al.año || '-'}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${al.activo === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {al.activo === 1 ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => abrirModalEditar(al)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                      >
                        <Pencil size={13} /> Editar
                      </button>
                      <button
                        onClick={() => cambiarEstado(al)}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${al.activo === 1 ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                      >
                        <Power size={13} /> {al.activo === 1 ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => { setAlumnoEditando(al); setModalAccesoAbierto(true); }}
                        className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition"
                      >
                        <UserPlus size={13} /> Acceso
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-400">No hay alumnos que coincidan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filtrados.map((al) => (
            <article key={al.id} className="px-1 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {al.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{al.apellido}, {al.nombre}</p>
                    <p className="text-sm text-slate-500">{al.curso_nombre || al.año}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${al.activo === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {al.activo === 1 ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Mostrando {filtrados.length} de {alumnos.filter(a => mostrarInactivos || a.activo === 1).length}</span>
          <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 transition disabled:opacity-40" disabled>Anterior</button>
            <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 transition">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Modal alta/edición */}
      <Modal open={modalAbierto} onClose={cerrarModal} titulo={alumnoEditando ? 'Editar alumno' : 'Registrar nuevo alumno'}>
        <form onSubmit={guardarAlumno} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Nombre</label>
              <input required value={form.nombre} onChange={(e) => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Ej: Juan" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Apellido</label>
              <input required value={form.apellido} onChange={(e) => setForm(p => ({ ...p, apellido: e.target.value }))} placeholder="Ej: Perez" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="Ej: juan@mail.com" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Telefono</label>
              <input value={form.telefono} onChange={(e) => setForm(p => ({ ...p, telefono: e.target.value }))} placeholder="+54 11 ..." className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Grado</label>
              <input value={form.grado} onChange={(e) => setForm(p => ({ ...p, grado: e.target.value }))} placeholder="Ej: 5to A" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Fecha de nacimiento</label>
              <input type="date" value={form.fecha_nacimiento} onChange={(e) => setForm(p => ({ ...p, fecha_nacimiento: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Curso</label>
              <select value={form.curso_id} onChange={(e) => setForm(p => ({ ...p, curso_id: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option value="">Seleccionar curso</option>
                {cursosOpc.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={cerrarModal} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Guardando...' : alumnoEditando ? 'Guardar cambios' : 'Guardar alumno'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal gestionar acceso */}
      <Modal open={modalAccesoAbierto} onClose={() => setModalAccesoAbierto(false)} titulo="Gestionar acceso del alumno">
        <form onSubmit={(e) => { e.preventDefault(); setModalAccesoAbierto(false); }} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Modo</label>
            <select value={formAcceso.modo} onChange={(e) => setFormAcceso(p => ({ ...p, modo: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="nuevo">Crear usuario nuevo</option>
              <option value="existente">Vincular usuario existente</option>
            </select>
          </div>
          {formAcceso.modo === 'nuevo' && (
            <>
              <div>
                <label className="text-sm font-semibold text-slate-700">Nombre</label>
                <input value={formAcceso.nombre} onChange={(e) => setFormAcceso(p => ({ ...p, nombre: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input type="email" value={formAcceso.email} onChange={(e) => setFormAcceso(p => ({ ...p, email: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Contrasena</label>
                <input type="password" value={formAcceso.password} onChange={(e) => setFormAcceso(p => ({ ...p, password: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
              </div>
            </>
          )}
          {formAcceso.modo === 'existente' && (
            <p className="text-sm text-slate-500 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">No hay usuarios de alumno disponibles para vincular. Usa "Crear usuario nuevo".</p>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalAccesoAbierto(false)} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition">Guardar acceso</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
