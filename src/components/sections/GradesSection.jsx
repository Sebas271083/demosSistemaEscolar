import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Download } from 'lucide-react';
import { calificaciones } from '../../data/mockData';

const MATERIAS = ['mat', 'esp', 'cie', 'ing', 'ef'];
const MATERIA_LABELS = { mat: 'Matematica', esp: 'Espanol', cie: 'Ciencias', ing: 'Ingles', ef: 'Ed. Fisica' };

const promedioMateria = MATERIAS.map((m) => ({
  materia: MATERIA_LABELS[m].split(' ')[0],
  promedio: Number((calificaciones.reduce((a, al) => a + al[m], 0) / calificaciones.length).toFixed(1)),
}));

const distribucion = (() => {
  const all = calificaciones.flatMap((al) => MATERIAS.map((m) => al[m]));
  return [
    { name: 'Excelente (8-10)', value: all.filter((n) => n >= 8).length, color: '#22C55E' },
    { name: 'Bueno (6-8)', value: all.filter((n) => n >= 6 && n < 8).length, color: '#F97316' },
    { name: 'Necesita mejora', value: all.filter((n) => n < 6).length, color: '#EF4444' },
  ];
})();

const colorNota = (n) => {
  if (n >= 8) return 'text-emerald-700 bg-emerald-50';
  if (n >= 6) return 'text-amber-700 bg-amber-50';
  return 'text-red-700 bg-red-50';
};

const promedio = (al) => {
  const s = MATERIAS.reduce((a, m) => a + al[m], 0);
  return (s / MATERIAS.length).toFixed(1);
};

export default function GradesSection() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calificaciones</h1>
          <p className="mt-1 text-slate-500">3° Año A · Trimestre 3 · 2026</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          <Download size={18} />
          Exportar
        </button>
      </section>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Tabla de calificaciones</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4 text-left font-semibold whitespace-nowrap">Alumno</th>
                {MATERIAS.map((m) => (
                  <th key={m} className="px-4 py-4 text-center font-semibold whitespace-nowrap">
                    {MATERIA_LABELS[m].split(' ')[0]}
                  </th>
                ))}
                <th className="px-4 py-4 text-center font-semibold whitespace-nowrap">Promedio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {calificaciones.map((al) => {
                const prom = promedio(al);
                return (
                  <tr key={al.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 font-medium text-slate-800">{al.alumno}</td>
                    {MATERIAS.map((m) => (
                      <td key={m} className="px-4 py-4 text-center">
                        <span className={`inline-block rounded-xl px-2.5 py-1 text-xs font-bold ${colorNota(al[m])}`}>
                          {al[m]}
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-block rounded-xl px-3 py-1 text-sm font-bold ${colorNota(Number(prom))}`}>
                        {prom}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="mb-4 font-bold text-slate-900">Promedio por materia</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={promedioMateria} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="materia" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: 12 }}
                formatter={(v) => [v, 'Promedio']}
              />
              <Bar dataKey="promedio" fill="#0F172A" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="mb-4 font-bold text-slate-900">Distribucion de calificaciones</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={distribucion} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {distribucion.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: 12 }}
                formatter={(v, n) => [v, n]}
              />
              <Legend
                formatter={(v) => <span style={{ fontSize: 11, color: '#64748B' }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
