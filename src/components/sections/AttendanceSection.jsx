import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { asistenciaInicial } from '../../data/mockData';

const cursos = [
  { id: 1, nombre: '3° Año A' },
  { id: 2, nombre: '3° Año B' },
  { id: 3, nombre: '4° Año A' },
  { id: 4, nombre: '4° Año B' },
  { id: 5, nombre: '2° Año A' },
];

const estados = ['presente', 'ausente', 'tarde', 'justificado'];

const estadoColor = {
  presente: 'bg-emerald-50 text-emerald-700',
  ausente: 'bg-red-50 text-red-700',
  tarde: 'bg-amber-50 text-amber-700',
  justificado: 'bg-blue-50 text-blue-700',
};

export default function AttendanceSection() {
  const [cursoId, setCursoId] = useState('1');
  const [fecha, setFecha] = useState('2026-05-20');
  const [lista, setLista] = useState(
    asistenciaInicial.map((a) => ({ ...a, estado: a.presente ? 'presente' : 'ausente' }))
  );
  const [guardado, setGuardado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const cambiarEstado = (id, estado) => {
    setLista((prev) => prev.map((a) => (a.id === id ? { ...a, estado } : a)));
    setGuardado(false);
  };

  const guardarAsistencia = async () => {
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 600));
    setGuardado(true);
    setGuardando(false);
    setTimeout(() => setGuardado(false), 3000);
  };

  const presentes = lista.filter((a) => a.estado === 'presente').length;
  const ausentes = lista.filter((a) => a.estado === 'ausente').length;
  const tardes = lista.filter((a) => a.estado === 'tarde').length;
  const justificados = lista.filter((a) => a.estado === 'justificado').length;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Asistencias</h1>
          <p className="mt-1 text-slate-500">Registro diario de asistencia por curso.</p>
        </div>
        <button
          onClick={guardarAsistencia}
          disabled={guardando}
          className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60"
        >
          <Save size={18} />
          {guardando ? 'Guardando...' : 'Guardar asistencia'}
        </button>
      </section>

      {guardado && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          Asistencia registrada correctamente para {cursos.find((c) => c.id === Number(cursoId))?.nombre}.
        </div>
      )}

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-slate-700">Curso</label>
            <select
              value={cursoId}
              onChange={(e) => setCursoId(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Seleccionar curso</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="flex items-end">
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <RefreshCw size={18} />
              Cargar alumnos
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Lista de asistencia</h2>
            <p className="text-sm text-slate-500">{lista.length} alumnos cargados</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Presentes', count: presentes, cls: 'bg-emerald-50 text-emerald-700' },
              { label: 'Ausentes', count: ausentes, cls: 'bg-red-50 text-red-700' },
              { label: 'Tarde', count: tardes, cls: 'bg-amber-50 text-amber-700' },
              { label: 'Justificados', count: justificados, cls: 'bg-blue-50 text-blue-700' },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl px-3 py-1.5 text-xs font-semibold ${s.cls}`}>
                {s.label}: {s.count}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Alumno</th>
                <th className="px-5 py-4 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {lista.map((alumno) => (
                <tr key={alumno.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{alumno.nombre}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {estados.map((estado) => (
                        <button
                          key={estado}
                          type="button"
                          onClick={() => cambiarEstado(alumno.id, estado)}
                          className={`rounded-xl border px-4 py-2 text-xs font-semibold capitalize transition ${
                            alumno.estado === estado
                              ? 'border-slate-950 bg-slate-950 text-white'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {estado}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
