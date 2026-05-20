import { useState } from 'react';
import { Plus, Search, Eye, EyeOff, RefreshCw, Pencil, Power } from 'lucide-react';
import Modal from '../shared/Modal';

const cursosIniciales = [
  { id: 1, nombre: '1° Año A', codigo: '1A-PRI', descripcion: 'Primer año turno mañana', nivel: 'Primaria', turno: 'manana', cupo_maximo: 30, activo: 1 },
  { id: 2, nombre: '1° Año B', codigo: '1B-PRI', descripcion: 'Primer año turno tarde', nivel: 'Primaria', turno: 'tarde', cupo_maximo: 30, activo: 1 },
  { id: 3, nombre: '2° Año A', codigo: '2A-SEC', descripcion: 'Segundo año turno mañana', nivel: 'Secundaria', turno: 'manana', cupo_maximo: 28, activo: 1 },
  { id: 4, nombre: '2° Año B', codigo: '2B-SEC', descripcion: 'Segundo año turno tarde', nivel: 'Secundaria', turno: 'tarde', cupo_maximo: 30, activo: 1 },
  { id: 5, nombre: '3° Año A', codigo: '3A-SEC', descripcion: 'Tercer año turno mañana', nivel: 'Secundaria', turno: 'manana', cupo_maximo: 25, activo: 1 },
  { id: 6, nombre: '3° Año B', codigo: '3B-SEC', descripcion: 'Tercer año turno tarde', nivel: 'Secundaria', turno: 'tarde', cupo_maximo: 27, activo: 1 },
  { id: 7, nombre: '4° Año A', codigo: '4A-SEC', descripcion: 'Cuarto año turno mañana', nivel: 'Secundaria', turno: 'manana', cupo_maximo: 24, activo: 1 },
  { id: 8, nombre: '5° Año A', codigo: '5A-SEC', descripcion: 'Quinto año turno mañana', nivel: 'Secundaria', turno: 'manana', cupo_maximo: 22, activo: 0 },
];

const turnos = [
  { value: 'manana', label: 'Mañana' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'noche', label: 'Noche' },
  { value: 'continuo', label: 'Continuo' },
];

const formInicial = { nombre: '', codigo: '', descripcion: '', nivel: '', turno: 'manana', cupoMaximo: '' };

export default function CursosSection() {
  const [cursos, setCursos] = useState(cursosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarInactivos, setMostrarInactivos] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cursoEditando, setCursoEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState(formInicial);

  const filtrados = cursos.filter((c) => {
    if (!mostrarInactivos && c.activo !== 1) return false;
    const texto = `${c.nombre} ${c.codigo}`.toLowerCase();
    return !busqueda || texto.includes(busqueda.toLowerCase());
  });

  const abrirModalNuevo = () => { setCursoEditando(null); setForm(formInicial); setModalAbierto(true); };
  const abrirModalEditar = (c) => {
    setCursoEditando(c);
    setForm({ nombre: c.nombre, codigo: c.codigo, descripcion: c.descripcion || '', nivel: c.nivel || '', turno: c.turno, cupoMaximo: c.cupo_maximo ?? '' });
    setModalAbierto(true);
  };
  const cerrarModal = () => { setModalAbierto(false); setCursoEditando(null); setForm(formInicial); };

  const guardarCurso = async (e) => {
    e.preventDefault();
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 500));
    if (cursoEditando) {
      setCursos((prev) => prev.map((c) => c.id === cursoEditando.id ? { ...c, ...form, cupo_maximo: form.cupoMaximo ? Number(form.cupoMaximo) : null } : c));
    } else {
      setCursos((prev) => [...prev, { ...form, id: Date.now(), cupo_maximo: form.cupoMaximo ? Number(form.cupoMaximo) : null, activo: 1 }]);
    }
    setGuardando(false);
    cerrarModal();
  };

  const cambiarEstado = (curso) => {
    setCursos((prev) => prev.map((c) => c.id === curso.id ? { ...c, activo: c.activo === 1 ? 0 : 1 } : c));
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cursos</h1>
          <p className="mt-1 text-slate-500">Gestion de cursos, divisiones, cupos y turnos.</p>
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
            Nuevo curso
          </button>
        </div>
      </section>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Listado de cursos</h2>
            <p className="text-sm text-slate-500">{filtrados.length} cursos encontrados</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o codigo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['ID', 'Curso', 'Codigo', 'Nivel', 'Turno', 'Cupo', 'Estado', 'Acciones'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((c) => (
                <tr key={c.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 text-slate-500">{c.id}</td>
                  <td className="px-5 py-4 font-semibold text-slate-900">{c.nombre}</td>
                  <td className="px-5 py-4 text-slate-600">{c.codigo}</td>
                  <td className="px-5 py-4 text-slate-500">{c.nivel || '-'}</td>
                  <td className="px-5 py-4 text-slate-500 capitalize">{c.turno || '-'}</td>
                  <td className="px-5 py-4 text-slate-500">{c.cupo_maximo ?? '-'}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.activo === 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                      {c.activo === 1 ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirModalEditar(c)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                      >
                        <Pencil size={13} /> Editar
                      </button>
                      <button
                        onClick={() => cambiarEstado(c)}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${c.activo === 1 ? 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100' : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                      >
                        <Power size={13} /> {c.activo === 1 ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-400">No hay cursos que coincidan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Mostrando {filtrados.length} de {cursos.length}</span>
          <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 transition disabled:opacity-40" disabled>Anterior</button>
            <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 transition">Siguiente</button>
          </div>
        </div>
      </div>

      <Modal open={modalAbierto} onClose={cerrarModal} titulo={cursoEditando ? 'Editar curso' : 'Registrar nuevo curso'}>
        <form onSubmit={guardarCurso} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Nombre del curso</label>
            <input required value={form.nombre} onChange={(e) => setForm(p => ({ ...p, nombre: e.target.value }))} placeholder="Ej: 1A Primaria" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Codigo</label>
            <input required value={form.codigo} onChange={(e) => setForm(p => ({ ...p, codigo: e.target.value }))} placeholder="Ej: 1A-PRI" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Descripcion</label>
            <input value={form.descripcion} onChange={(e) => setForm(p => ({ ...p, descripcion: e.target.value }))} placeholder="Curso del turno mañana" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Nivel</label>
              <input value={form.nivel} onChange={(e) => setForm(p => ({ ...p, nivel: e.target.value }))} placeholder="Ej: Primaria" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Cupo maximo</label>
              <input type="number" value={form.cupoMaximo} onChange={(e) => setForm(p => ({ ...p, cupoMaximo: e.target.value }))} placeholder="Ej: 30" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Turno</label>
            <select value={form.turno} onChange={(e) => setForm(p => ({ ...p, turno: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              {turnos.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={cerrarModal} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Guardando...' : cursoEditando ? 'Guardar cambios' : 'Guardar curso'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
