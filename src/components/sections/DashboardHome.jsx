import {
  GraduationCap, CalendarCheck, CreditCard, MessageSquare,
  TrendingUp, ShieldCheck, ArrowUpRight, FileClock, Users, AlertCircle,
} from 'lucide-react';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
} from 'recharts';
import { useRef, useEffect, useState } from 'react';
import { calificaciones, transacciones, asistenciaInicial, eventos, actividadReciente } from '../../data/mockData';

const colors = {
  navy: '#0f172a', blue: '#2563eb', cyan: '#06b6d4',
  emerald: '#10b981', amber: '#f59e0b', rose: '#f43f5e', soft: '#e2e8f0',
};

function ChartSurface({ minHeight, className = '', children }) {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ width: Math.round(el.clientWidth), height: Math.round(el.clientHeight) });
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`min-w-0 ${className}`} style={{ minHeight }}>
      {size.width > 0 && size.height > 0 ? children(size) : null}
    </div>
  );
}

export default function DashboardHome({ onNavigate }) {
  const cobrado = transacciones.filter((t) => t.estado === 'pagado').reduce((a, t) => a + t.monto, 0);
  const pendiente = transacciones.filter((t) => t.estado === 'pendiente').reduce((a, t) => a + t.monto, 0);
  const presentes = asistenciaInicial.filter((a) => a.presente).length;

  const metricas = [
    { titulo: 'Alumnos activos', valor: '342', detalle: 'Base activa de matricula', Icono: GraduationCap, color: 'bg-blue-50 text-blue-700', borde: 'border-blue-100', id: 'alumnos' },
    { titulo: 'Asistencias hoy', valor: String(presentes), detalle: `${asistenciaInicial.length - presentes} ausencias registradas`, Icono: CalendarCheck, color: 'bg-emerald-50 text-emerald-700', borde: 'border-emerald-100', id: 'asistencias' },
    { titulo: 'Cobranza mensual', valor: `$${cobrado.toLocaleString('es-AR')}`, detalle: `$${pendiente.toLocaleString('es-AR')} pendientes`, Icono: CreditCard, color: 'bg-amber-50 text-amber-700', borde: 'border-amber-100', id: 'pagos' },
    { titulo: 'Comunicaciones', valor: '3', detalle: 'Mensajes sin leer', Icono: MessageSquare, color: 'bg-cyan-50 text-cyan-700', borde: 'border-cyan-100', id: 'comunicaciones' },
  ];

  const eventosPorTipo = [
    { tipo: 'institucional', cantidad: 3, color: colors.blue },
    { tipo: 'evaluacion', cantidad: 4, color: colors.amber },
    { tipo: 'reunion', cantidad: 2, color: colors.cyan },
    { tipo: 'feriado', cantidad: 1, color: colors.rose },
  ];

  const pagosData = [
    { name: 'Cobrado', value: cobrado, color: colors.emerald },
    { name: 'Pendiente', value: pendiente, color: colors.amber },
  ].filter((d) => d.value > 0);

  const alertas = [
    { titulo: 'Deuda pendiente', valor: `$${pendiente.toLocaleString('es-AR')}`, detalle: 'Cuotas pendientes, parciales o vencidas', Icono: CreditCard, color: 'text-amber-700 bg-amber-50' },
    { titulo: 'Tareas abiertas', valor: '12', detalle: 'En aulas virtuales activas', Icono: FileClock, color: 'text-blue-700 bg-blue-50' },
    { titulo: 'Ausencias del dia', valor: String(asistenciaInicial.filter((a) => !a.presente).length), detalle: 'Licencias del personal informadas', Icono: Users, color: 'text-rose-700 bg-rose-50' },
  ];

  const accesos = [
    { titulo: 'Alumnos activos', descripcion: '342 legajos disponibles' },
    { titulo: 'Cursos operativos', descripcion: '12 cursos con actividad' },
    { titulo: 'Promedio general', descripcion: '7.84 puntos' },
    { titulo: 'Eventos del mes', descripcion: `${eventos.length} eventos cargados` },
  ];

  const proximosEventos = eventos.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.85)] md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.35),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(6,182,212,0.2),_transparent_22%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(15,23,42,0.92))]" />
        <div className="relative grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <ShieldCheck size={16} />
              Vista ejecutiva institucional
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Lectura operativa real del colegio.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Resumen academico, administrativo y financiero basado en datos del sistema.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm text-slate-300">Usuario actual</p>
                <p className="mt-2 text-2xl font-bold">Juan García</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-300">administrador</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm text-slate-300">Ciclo de tablero</p>
                <p className="mt-2 text-2xl font-bold">05/2026</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald-300">Mes operativo</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-sm text-slate-300">Salud operativa</p>
                <p className="mt-2 text-2xl font-bold">87/100</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-amber-300">Estado general</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 self-start">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-300">Promedio academico</p>
                  <p className="mt-2 text-4xl font-bold">7.84</p>
                  <p className="mt-2 text-sm text-slate-300">Rendimiento consolidado a partir de calificaciones activas.</p>
                </div>
                <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Cursos activos</p>
                <p className="mt-2 text-3xl font-bold">12</p>
                <p className="mt-1 text-sm text-slate-400">Estructura academica vigente</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-sm text-slate-300">Eventos proximos</p>
                <p className="mt-2 text-3xl font-bold">{proximosEventos.length}</p>
                <p className="mt-1 text-sm text-slate-400">Agenda inmediata del sistema</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metricas */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metricas.map((item) => (
          <article
            key={item.titulo}
            onClick={() => onNavigate(item.id)}
            className={`cursor-pointer rounded-[1.75rem] border ${item.borde} bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.35)] hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-2xl p-3 ${item.color}`}>
                <item.Icono size={22} />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <ArrowUpRight size={14} />
                real
              </span>
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">{item.titulo}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{item.valor}</h2>
            <p className="mt-2 text-sm text-slate-500">{item.detalle}</p>
          </article>
        ))}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.28)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Eventos por tipo</h2>
              <p className="mt-1 text-sm text-slate-500">Distribucion del calendario del mes.</p>
            </div>
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
              <CalendarCheck size={20} />
            </div>
          </div>
          <ChartSurface minHeight={320} className="h-80">
            {({ width, height }) => (
              <BarChart width={width} height={height} data={eventosPorTipo}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.soft} />
                <XAxis dataKey="tipo" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 20px 50px -30px rgba(15,23,42,0.35)' }} />
                <Bar dataKey="cantidad" radius={[10, 10, 0, 0]}>
                  {eventosPorTipo.map((d) => <Cell key={d.tipo} fill={d.color} />)}
                </Bar>
              </BarChart>
            )}
          </ChartSurface>
        </div>

        <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.28)]">
          <h2 className="text-xl font-bold text-slate-950 mb-1">Cobranza vs deuda</h2>
          <p className="text-sm text-slate-500 mb-4">Lectura financiera del mes.</p>
          <ChartSurface minHeight={200} className="h-52">
            {({ width, height }) => (
              <PieChart width={width} height={height}>
                <Pie data={pagosData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                  {pagosData.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} />
              </PieChart>
            )}
          </ChartSurface>
          <div className="mt-3 space-y-2">
            {pagosData.map((d) => (
              <div key={d.name} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <p className="font-medium text-slate-900">{d.name}</p>
                </div>
                <span className="text-sm font-semibold text-slate-900">${d.value.toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom row */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr_0.9fr]">
        {/* Alertas */}
        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.28)]">
            <h2 className="text-xl font-bold text-slate-950">Alertas clave</h2>
            <div className="mt-5 space-y-3">
              {alertas.map((item) => (
                <div key={item.titulo} className="rounded-2xl border border-slate-100 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-2xl p-3 ${item.color}`}><item.Icono size={18} /></div>
                    <div>
                      <p className="font-semibold text-slate-900">{item.titulo}</p>
                      <p className="mt-1 text-2xl font-bold text-slate-950">{item.valor}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.detalle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.28)]">
            <h2 className="text-xl font-bold text-slate-950">Resumen operativo</h2>
            <div className="mt-5 space-y-3">
              {accesos.map((item) => (
                <div key={item.titulo} className="rounded-2xl border border-slate-100 px-4 py-4">
                  <p className="font-semibold text-slate-900">{item.titulo}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Proximos eventos */}
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.28)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Proximos eventos</h2>
              <p className="mt-1 text-sm text-slate-500">Agenda institucional y academica inmediata.</p>
            </div>
          </div>
          <div className="space-y-4">
            {proximosEventos.map((ev) => (
              <div key={ev.id} className="grid gap-4 rounded-2xl border border-slate-100 px-4 py-4 md:grid-cols-[96px_1fr]">
                <div className="rounded-2xl bg-slate-950 px-4 py-4 text-center text-white">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Inicio</p>
                  <p className="mt-2 text-sm font-bold">{ev.fecha.split('-').reverse().join('/')}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{ev.titulo}</h3>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{ev.tipo}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{ev.lugar}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.28)]">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700"><AlertCircle size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-slate-950">Actividad reciente</h2>
              <p className="text-sm text-slate-500">Ultimas acciones del sistema.</p>
            </div>
          </div>
          <div className="space-y-4">
            {actividadReciente.map((a) => (
              <div key={a.id} className="rounded-2xl border border-slate-100 px-4 py-4">
                <div className="flex items-start gap-2">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.color}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{a.texto}</p>
                    <p className="mt-1 text-xs text-slate-400">{a.tiempo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
