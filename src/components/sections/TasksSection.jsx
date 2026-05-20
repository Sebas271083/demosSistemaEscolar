import { useState } from 'react';
import { Plus, RefreshCw, Eye } from 'lucide-react';
import Modal from '../shared/Modal';

const TIPOS = ['examen', 'trabajo_practico', 'oral', 'recuperatorio', 'proyecto', 'otro'];
const ESTADOS_EV = ['programada', 'realizada', 'cancelada', 'archivada'];

const cursosOpc = [
  { id: 1, nombre: '3° Año A' }, { id: 2, nombre: '3° Año B' },
  { id: 3, nombre: '4° Año A' }, { id: 4, nombre: '2° Año A' },
];
const materiasOpc = [
  { id: 1, nombre: 'Matematica' }, { id: 2, nombre: 'Espanol' },
  { id: 3, nombre: 'Ciencias' }, { id: 4, nombre: 'Ingles' }, { id: 5, nombre: 'Ed. Fisica' },
];
const docentesOpc = [
  { id: 1, nombre: 'Prof. Carlos Mendoza' }, { id: 2, nombre: 'Dra. Ana Rodriguez' },
  { id: 3, nombre: 'Ing. Roberto Silva' }, { id: 4, nombre: 'Prof. Mariana Torres' },
];

const evaluacionesIniciales = [
  { id: 1, titulo: 'Examen primer trimestre', tipo_evaluacion: 'examen', fecha: '2026-05-27', hora_inicio: '09:00', hora_fin: '12:00', curso_nombre: '3° Año A', materia_nombre: 'Matematica', docente_nombre: 'Prof. Carlos Mendoza', estado: 'programada' },
  { id: 2, titulo: 'Trabajo practico - Osmosis', tipo_evaluacion: 'trabajo_practico', fecha: '2026-05-28', hora_inicio: '10:00', hora_fin: '11:00', curso_nombre: '3° Año A', materia_nombre: 'Ciencias', docente_nombre: 'Ing. Roberto Silva', estado: 'programada' },
  { id: 3, titulo: 'Oral Ingles - Unit 8', tipo_evaluacion: 'oral', fecha: '2026-05-22', hora_inicio: '08:00', hora_fin: '09:30', curso_nombre: '4° Año A', materia_nombre: 'Ingles', docente_nombre: 'Prof. Mariana Torres', estado: 'realizada' },
  { id: 4, titulo: 'Recuperatorio matematica', tipo_evaluacion: 'recuperatorio', fecha: '2026-05-30', hora_inicio: '14:00', hora_fin: '16:00', curso_nombre: '3° Año B', materia_nombre: 'Matematica', docente_nombre: 'Prof. Carlos Mendoza', estado: 'programada' },
  { id: 5, titulo: 'Proyecto Revolucion Industrial', tipo_evaluacion: 'proyecto', fecha: '2026-05-31', hora_inicio: null, hora_fin: null, curso_nombre: '3° Año B', materia_nombre: 'Espanol', docente_nombre: 'Dra. Ana Rodriguez', estado: 'programada' },
];

const estadoColor = {
  programada: 'bg-blue-50 text-blue-700',
  realizada: 'bg-emerald-50 text-emerald-700',
  cancelada: 'bg-red-50 text-red-700',
  archivada: 'bg-slate-100 text-slate-500',
};

const tipoLabel = {
  examen: 'Examen',
  trabajo_practico: 'Trabajo practico',
  oral: 'Oral',
  recuperatorio: 'Recuperatorio',
  proyecto: 'Proyecto',
  otro: 'Otro',
};

const evInicial = { cursoId: '', materiaId: '', docenteId: '', titulo: '', descripcion: '', tipoEvaluacion: 'examen', fecha: '', horaInicio: '', horaFin: '', estado: 'programada' };

export default function TasksSection() {
  const [evaluaciones, setEvaluaciones] = useState(evaluacionesIniciales);
  const [filtroCurso, setFiltroCurso] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [evEditando, setEvEditando] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState(evInicial);
  const [detalle, setDetalle] = useState(null);

  const filtradas = evaluaciones.filter((ev) => {
    if (filtroCurso && ev.curso_nombre !== cursosOpc.find(c => String(c.id) === filtroCurso)?.nombre) return false;
    if (filtroMateria && ev.materia_nombre !== materiasOpc.find(m => String(m.id) === filtroMateria)?.nombre) return false;
    if (filtroEstado && ev.estado !== filtroEstado) return false;
    return true;
  });

  const abrirModalNuevo = () => { setEvEditando(null); setForm(evInicial); setModalAbierto(true); };
  const cerrarModal = () => { setModalAbierto(false); setEvEditando(null); setForm(evInicial); };

  const guardarEvaluacion = async (e) => {
    e.preventDefault();
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 500));
    const curso = cursosOpc.find((c) => String(c.id) === form.cursoId);
    const materia = materiasOpc.find((m) => String(m.id) === form.materiaId);
    const docente = docentesOpc.find((d) => String(d.id) === form.docenteId);
    if (evEditando) {
      setEvaluaciones((prev) => prev.map((ev) => ev.id === evEditando.id ? { ...ev, ...form, curso_nombre: curso?.nombre || ev.curso_nombre, materia_nombre: materia?.nombre || ev.materia_nombre, docente_nombre: docente?.nombre || ev.docente_nombre, hora_inicio: form.horaInicio, hora_fin: form.horaFin, tipo_evaluacion: form.tipoEvaluacion } : ev));
    } else {
      setEvaluaciones((prev) => [...prev, { ...form, id: Date.now(), curso_nombre: curso?.nombre || '', materia_nombre: materia?.nombre || '', docente_nombre: docente?.nombre || '', hora_inicio: form.horaInicio, hora_fin: form.horaFin, tipo_evaluacion: form.tipoEvaluacion }]);
    }
    setGuardando(false);
    cerrarModal();
  };

  const formatHora = (inicio, fin) => {
    if (!inicio) return '-';
    return fin ? `${inicio} - ${fin}` : inicio;
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Evaluaciones</h1>
          <p className="mt-1 text-slate-500">Examenes, practicos y recuperatorios programados.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <RefreshCw size={18} />
            Actualizar
          </button>
          <button
            onClick={abrirModalNuevo}
            className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            <Plus size={18} />
            Nueva evaluacion
          </button>
        </div>
      </section>

      {/* Filtros */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-700">Curso</label>
            <select value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="">Todos</option>
              {cursosOpc.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Materia</label>
            <select value={filtroMateria} onChange={(e) => setFiltroMateria(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="">Todas</option>
              {materiasOpc.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Estado</label>
            <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="">Todos</option>
              {ESTADOS_EV.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Listado de evaluaciones</h2>
          <p className="text-sm text-slate-500">{filtradas.length} evaluaciones encontradas</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['Titulo', 'Tipo', 'Fecha', 'Horario', 'Curso', 'Materia', 'Docente', 'Estado', ''].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtradas.map((ev) => (
                <tr key={ev.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">{ev.titulo}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 capitalize">
                      {tipoLabel[ev.tipo_evaluacion] || ev.tipo_evaluacion}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{ev.fecha ? ev.fecha.split('-').reverse().join('/') : '-'}</td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{formatHora(ev.hora_inicio, ev.hora_fin)}</td>
                  <td className="px-5 py-4 text-slate-700 whitespace-nowrap">{ev.curso_nombre}</td>
                  <td className="px-5 py-4 text-slate-700 whitespace-nowrap">{ev.materia_nombre}</td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{ev.docente_nombre}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${estadoColor[ev.estado]}`}>
                      {ev.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => setDetalle(ev)} className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition">
                      <Eye size={13} /> Ver
                    </button>
                  </td>
                </tr>
              ))}
              {filtradas.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-sm text-slate-400">No hay evaluaciones que coincidan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal nueva evaluacion */}
      <Modal open={modalAbierto} onClose={cerrarModal} titulo={evEditando ? 'Editar evaluacion' : 'Nueva evaluacion'}>
        <form onSubmit={guardarEvaluacion} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Titulo</label>
            <input required value={form.titulo} onChange={(e) => setForm(p => ({ ...p, titulo: e.target.value }))} placeholder="Ej: Examen de matematica" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Tipo</label>
              <select value={form.tipoEvaluacion} onChange={(e) => setForm(p => ({ ...p, tipoEvaluacion: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                {TIPOS.map((t) => <option key={t} value={t}>{tipoLabel[t]}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Estado</label>
              <select value={form.estado} onChange={(e) => setForm(p => ({ ...p, estado: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                {ESTADOS_EV.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Fecha</label>
              <input type="date" required value={form.fecha} onChange={(e) => setForm(p => ({ ...p, fecha: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Hora inicio</label>
              <input type="time" value={form.horaInicio} onChange={(e) => setForm(p => ({ ...p, horaInicio: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Hora fin</label>
              <input type="time" value={form.horaFin} onChange={(e) => setForm(p => ({ ...p, horaFin: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Curso</label>
              <select value={form.cursoId} onChange={(e) => setForm(p => ({ ...p, cursoId: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option value="">Seleccionar</option>
                {cursosOpc.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Materia</label>
              <select value={form.materiaId} onChange={(e) => setForm(p => ({ ...p, materiaId: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option value="">Seleccionar</option>
                {materiasOpc.map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Docente</label>
            <select value={form.docenteId} onChange={(e) => setForm(p => ({ ...p, docenteId: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="">Seleccionar</option>
              {docentesOpc.map((d) => <option key={d.id} value={d.id}>{d.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Descripcion</label>
            <textarea rows={2} value={form.descripcion} onChange={(e) => setForm(p => ({ ...p, descripcion: e.target.value }))} placeholder="(opcional)" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={cerrarModal} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Guardando...' : 'Guardar evaluacion'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal detalle */}
      {detalle && (
        <Modal open={!!detalle} onClose={() => setDetalle(null)} titulo="Detalle de evaluacion">
          <div className="space-y-3 text-sm">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 space-y-2">
              <p><span className="font-semibold text-slate-700">Titulo:</span> <span className="text-slate-900">{detalle.titulo}</span></p>
              <p><span className="font-semibold text-slate-700">Tipo:</span> <span className="text-slate-900">{tipoLabel[detalle.tipo_evaluacion]}</span></p>
              <p><span className="font-semibold text-slate-700">Fecha:</span> <span className="text-slate-900">{detalle.fecha ? detalle.fecha.split('-').reverse().join('/') : '-'}</span></p>
              <p><span className="font-semibold text-slate-700">Horario:</span> <span className="text-slate-900">{formatHora(detalle.hora_inicio, detalle.hora_fin)}</span></p>
              <p><span className="font-semibold text-slate-700">Curso:</span> <span className="text-slate-900">{detalle.curso_nombre}</span></p>
              <p><span className="font-semibold text-slate-700">Materia:</span> <span className="text-slate-900">{detalle.materia_nombre}</span></p>
              <p><span className="font-semibold text-slate-700">Docente:</span> <span className="text-slate-900">{detalle.docente_nombre}</span></p>
            </div>
            <div className="flex justify-end">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${estadoColor[detalle.estado]}`}>{detalle.estado}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
