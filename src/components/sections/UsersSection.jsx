import { useState } from 'react';
import { Search, Plus, UserX, UserCheck, Mail, Shield } from 'lucide-react';
import Modal from '../shared/Modal';
import { usuarios } from '../../data/mockData';

const roles = ['Todos', 'Administrador', 'Docente', 'Padre/Madre', 'Alumno'];

const rolBadge = {
  Administrador: 'bg-blue-100 text-blue-700',
  Docente: 'bg-emerald-100 text-emerald-700',
  'Padre/Madre': 'bg-orange-100 text-orange-700',
  Alumno: 'bg-violet-100 text-violet-700',
};

export default function UsersSection() {
  const [busqueda, setBusqueda] = useState('');
  const [rolFiltro, setRolFiltro] = useState('Todos');
  const [modalNuevo, setModalNuevo] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'Docente' });
  const [success, setSuccess] = useState(false);

  const filtrados = usuarios.filter((u) => {
    const matchBusqueda =
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase());
    const matchRol = rolFiltro === 'Todos' || u.rol === rolFiltro;
    return matchBusqueda && matchRol;
  });

  const enviarInvitacion = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setModalNuevo(false);
      setSuccess(false);
      setForm({ nombre: '', email: '', rol: 'Docente' });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Usuarios</h1>
          <p className="mt-1 text-slate-500">{usuarios.length} usuarios registrados</p>
        </div>
        <button
          onClick={() => setModalNuevo(true)}
          className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          <Plus size={18} />
          Nuevo usuario
        </button>
      </section>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o email..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRolFiltro(r)}
                className={`rounded-2xl px-3.5 py-2 text-xs font-semibold transition ${
                  rolFiltro === r
                    ? 'bg-slate-950 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['Usuario', 'Rol', 'Ultimo acceso', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((u) => (
                <tr key={u.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${u.color}`}>
                        {u.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{u.nombre}</p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${rolBadge[u.rol] || 'bg-slate-100 text-slate-600'}`}>
                      {u.rol}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{u.ultimoAcceso}</td>
                  <td className="px-5 py-4">
                    <span className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      u.estado === 'Activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${u.estado === 'Activo' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="flex h-7 w-7 items-center justify-center rounded-xl text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition" title="Ver perfil">
                        <Shield size={14} />
                      </button>
                      <button className="flex h-7 w-7 items-center justify-center rounded-xl text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition" title="Reenviar invitacion">
                        <Mail size={14} />
                      </button>
                      <button
                        className={`flex h-7 w-7 items-center justify-center rounded-xl transition ${
                          u.estado === 'Activo'
                            ? 'text-slate-400 hover:bg-red-50 hover:text-red-500'
                            : 'text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                        }`}
                        title={u.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                      >
                        {u.estado === 'Activo' ? <UserX size={14} /> : <UserCheck size={14} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                    No se encontraron usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalNuevo} onClose={() => { setModalNuevo(false); setSuccess(false); }} titulo="Crear nuevo usuario">
        {success ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <UserCheck size={24} className="text-emerald-600" />
            </div>
            <p className="font-bold text-slate-900">Invitacion enviada</p>
            <p className="mt-1 text-sm text-slate-400">{form.email}</p>
          </div>
        ) : (
          <form onSubmit={enviarInvitacion} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre completo</label>
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                placeholder="Ej: Prof. Juan Garcia"
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="usuario@colegiosanmartin.edu.ar"
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rol</label>
              <select
                value={form.rol}
                onChange={(e) => setForm((p) => ({ ...p, rol: e.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {['Administrador', 'Docente', 'Padre/Madre', 'Alumno'].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalNuevo(false)}
                className="flex-1 rounded-2xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-2xl bg-slate-950 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Enviar invitacion
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
