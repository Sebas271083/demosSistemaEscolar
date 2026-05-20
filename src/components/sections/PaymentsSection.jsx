import { useState } from 'react';
import {
  BarChart2, CreditCard, Wallet, AlertTriangle, Users,
  RefreshCw, Plus, Receipt, Search, Pencil, Trash2
} from 'lucide-react';
import Modal from '../shared/Modal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { transacciones } from '../../data/mockData';

/* ── mock data ─────────────────────────────────────────────────── */
const cursosOpc = [
  { id: 1, nombre: '3° Año A' }, { id: 2, nombre: '3° Año B' },
  { id: 3, nombre: '4° Año A' }, { id: 4, nombre: '2° Año A' },
];

const conceptosData = [
  { id: 1, nombre: 'Cuota mensual', importe: 15000, descripcion: 'Cuota mensual del ciclo 2026' },
  { id: 2, nombre: 'Actividad deportiva', importe: 5000, descripcion: 'Taller deportivo extracurricular' },
  { id: 3, nombre: 'Excursion educativa', importe: 20000, descripcion: 'Salida de campo anual' },
  { id: 4, nombre: 'Uniforme', importe: 8000, descripcion: 'Uniforme escolar completo' },
];

const deudoresData = [
  { id: 1, alumno_id: 2, nombre: 'Lopez', apellido: 'Juan', curso_nombre: '3° Año A', cuotas_pendientes: 2, conceptos_deuda: 'Cuota Abril, Cuota Mayo', total_deuda: 30000, tiene_vencidas: 1 },
  { id: 2, alumno_id: 6, nombre: 'Torres', apellido: 'Sofia', curso_nombre: '3° Año B', cuotas_pendientes: 1, conceptos_deuda: 'Excursion educativa', total_deuda: 20000, tiene_vencidas: 0 },
  { id: 3, alumno_id: 10, nombre: 'Herrera', apellido: 'Valentina', curso_nombre: '4° Año A', cuotas_pendientes: 1, conceptos_deuda: 'Cuota Mayo', total_deuda: 15000, tiene_vencidas: 0 },
  { id: 4, alumno_id: 7, nombre: 'Fernandez', apellido: 'Pablo', curso_nombre: '3° Año B', cuotas_pendientes: 3, conceptos_deuda: 'Cuota Marzo, Cuota Abril, Cuota Mayo', total_deuda: 45000, tiene_vencidas: 1 },
];

const cuotasAlumnoMock = [
  { id: 1, concepto_nombre: 'Cuota Marzo', fecha_vencimiento: '2026-03-25', importe: 15000, importe_pagado: 0, saldo: 15000, estado: 'vencido' },
  { id: 2, concepto_nombre: 'Cuota Abril', fecha_vencimiento: '2026-04-25', importe: 15000, importe_pagado: 0, saldo: 15000, estado: 'vencido' },
  { id: 3, concepto_nombre: 'Cuota Mayo', fecha_vencimiento: '2026-05-25', importe: 15000, importe_pagado: 0, saldo: 15000, estado: 'pendiente' },
];

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const mediosPago = ['efectivo','transferencia','tarjeta','mercadopago','otro'];

const cobradoMes = transacciones.filter((t) => t.estado === 'pagado').reduce((a, t) => a + t.monto, 0);
const deudaTotal = deudoresData.reduce((a, d) => a + d.total_deuda, 0);
const vencidoTotal = deudoresData.filter((d) => d.tiene_vencidas).reduce((a, d) => a + d.total_deuda, 0);

const estadoColor = { pendiente: 'bg-amber-50 text-amber-700', vencido: 'bg-red-50 text-red-700', parcial: 'bg-blue-50 text-blue-700' };

const dashChartData = [
  { mes: 'Mar', cobrado: 120000, deuda: 30000 },
  { mes: 'Abr', cobrado: 145000, deuda: 25000 },
  { mes: 'May', cobrado: cobradoMes, deuda: deudaTotal },
];
const pieMedios = [
  { name: 'Transferencia', value: 45, color: '#3B82F6' },
  { name: 'Tarjeta', value: 30, color: '#8B5CF6' },
  { name: 'QR', value: 15, color: '#10B981' },
  { name: 'Efectivo', value: 10, color: '#94A3B8' },
];

/* ── helpers ───────────────────────────────────────────────────── */
const fmt = (n) => `$${Number(n).toLocaleString('es-AR')}`;
const fmtFecha = (f) => f ? String(f).slice(0, 10).split('-').reverse().join('/') : '-';

export default function PaymentsSection() {
  /* state */
  const [busquedaDeudor, setBusquedaDeudor] = useState('');
  const [cursoFiltroDeudores, setCursoFiltroDeudores] = useState('');
  const [mesPagos, setMesPagos] = useState('5');
  const [anioPagos, setAnioPagos] = useState('2026');
  const [cursoPagos, setCursoPagos] = useState('');

  const [modalDashboard, setModalDashboard] = useState(false);
  const [modalConcepto, setModalConcepto] = useState(false);
  const [modalCuotas, setModalCuotas] = useState(false);
  const [modalCobrar, setModalCobrar] = useState(false);
  const [modalPago, setModalPago] = useState(false);

  const [alumnoCobrando, setAlumnoCobrando] = useState(null);
  const [cuotaActiva, setCuotaActiva] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const [formConcepto, setFormConcepto] = useState({ nombre: '', importe: '', descripcion: '' });
  const [formCuotas, setFormCuotas] = useState({ cursosIds: [], conceptoPagoId: '', fechaVencimiento: '' });
  const [formPago, setFormPago] = useState({ monto: '', medioPago: 'efectivo', comprobante: '', observacion: '' });

  /* derived */
  const deudoresFiltrados = deudoresData.filter((d) => {
    const texto = `${d.nombre} ${d.apellido}`.toLowerCase();
    return (!busquedaDeudor || texto.includes(busquedaDeudor.toLowerCase())) &&
           (!cursoFiltroDeudores || d.curso_nombre === cursosOpc.find(c => String(c.id) === cursoFiltroDeudores)?.nombre);
  });

  /* handlers */
  const abrirCobrar = (d) => { setAlumnoCobrando(d); setModalCobrar(true); };
  const abrirPagar = (cuota) => {
    setCuotaActiva(cuota);
    setFormPago({ monto: String(cuota.saldo), medioPago: 'efectivo', comprobante: '', observacion: '' });
    setModalPago(true);
  };

  const simularGuardado = async (cerrar) => {
    setGuardando(true);
    await new Promise(r => setTimeout(r, 600));
    setGuardando(false);
    cerrar();
  };

  const toggleCurso = (id) => {
    setFormCuotas(p => ({ ...p, cursosIds: p.cursosIds.includes(id) ? p.cursosIds.filter(x => x !== id) : [...p.cursosIds, id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pagos y cuotas</h1>
          <p className="mt-1 text-slate-500">Deuda institucional, cobros y gestion de cuotas.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <RefreshCw size={16} /> Actualizar
          </button>
          <button
            onClick={() => setModalDashboard(true)}
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <BarChart2 size={16} /> Dashboard
          </button>
          <button
            onClick={() => { setFormConcepto({ nombre: '', importe: '', descripcion: '' }); setModalConcepto(true); }}
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Plus size={16} /> Nuevo concepto
          </button>
          <button
            onClick={() => { setFormCuotas({ cursosIds: [], conceptoPagoId: '', fechaVencimiento: '' }); setModalCuotas(true); }}
            className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            <Receipt size={16} /> Generar cuotas
          </button>
        </div>
      </section>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: 'Cobrado este mes', valor: fmt(cobradoMes), icon: CreditCard, cls: 'text-slate-700' },
          { label: 'Deuda total', valor: fmt(deudaTotal), icon: Wallet, cls: 'text-amber-600' },
          { label: 'Vencido', valor: fmt(vencidoTotal), icon: AlertTriangle, cls: 'text-red-600' },
          { label: 'Alumnos con deuda', valor: deudoresData.length, icon: Users, cls: 'text-blue-600' },
        ].map((k) => (
          <div key={k.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center gap-3">
              <k.icon className={k.cls} size={22} />
              <div>
                <p className="text-sm text-slate-500">{k.label}</p>
                <p className="text-2xl font-bold text-slate-900">{k.valor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deudores */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Alumnos con deuda</h2>
            <p className="text-sm text-slate-500">{deudoresFiltrados.length} alumno(s) con cuotas pendientes o vencidas.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar alumno..."
                value={busquedaDeudor}
                onChange={(e) => setBusquedaDeudor(e.target.value)}
                className="h-10 rounded-2xl border border-slate-300 bg-slate-50 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <select
              value={cursoFiltroDeudores}
              onChange={(e) => setCursoFiltroDeudores(e.target.value)}
              className="h-10 rounded-2xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">Todos los cursos</option>
              {cursosOpc.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            <button className="h-10 rounded-2xl border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
              Marcar vencidas
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['Alumno', 'Curso', 'Cuotas', 'Detalle', 'Total deuda', 'Estado', ''].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deudoresFiltrados.map((d) => (
                <tr key={d.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">{d.nombre} {d.apellido}</td>
                  <td className="px-5 py-4 text-slate-600">{d.curso_nombre}</td>
                  <td className="px-5 py-4 text-slate-700">{d.cuotas_pendientes}</td>
                  <td className="px-5 py-4 max-w-[200px]"><span className="text-xs text-slate-500 line-clamp-1">{d.conceptos_deuda}</span></td>
                  <td className="px-5 py-4">
                    <span className={`font-semibold ${d.tiene_vencidas ? 'text-red-600' : 'text-amber-600'}`}>{fmt(d.total_deuda)}</span>
                  </td>
                  <td className="px-5 py-4">
                    {d.tiene_vencidas
                      ? <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">Vencida</span>
                      : <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Pendiente</span>}
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => abrirCobrar(d)} className="rounded-xl border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
                      Cobrar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagos registrados */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pagos registrados</h2>
            <p className="text-sm text-slate-500">{transacciones.length} pago(s) · periodo {MESES[Number(mesPagos) - 1]} {anioPagos}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select value={mesPagos} onChange={(e) => setMesPagos(e.target.value)} className="h-10 rounded-2xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="">Todos</option>
              {MESES.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>
            <input type="number" value={anioPagos} onChange={(e) => setAnioPagos(e.target.value)} placeholder="Año" className="h-10 w-24 rounded-2xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
            <select value={cursoPagos} onChange={(e) => setCursoPagos(e.target.value)} className="h-10 rounded-2xl border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="">Todos los cursos</option>
              {cursosOpc.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
            <button className="h-10 rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800 transition">Aplicar</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['Alumno', 'Concepto', 'Monto', 'Medio', 'Fecha', 'Estado cuota', ''].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transacciones.map((t) => (
                <tr key={t.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-800 whitespace-nowrap">{t.alumno}</td>
                  <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{t.concepto}</td>
                  <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">{fmt(t.monto)}</td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap capitalize">{t.metodo}</td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{t.fecha}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 capitalize">{t.estado}</span>
                  </td>
                  <td className="px-5 py-4">
                    {t.estado === 'pagado' && (
                      <button className="text-xs font-semibold text-red-500 hover:text-red-700 transition">Anular</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conceptos de pago */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Conceptos de pago</h2>
          <p className="text-sm text-slate-500">Base reutilizable para generar cuotas por curso.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['Concepto', 'Importe', 'Descripcion'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {conceptosData.map((c) => (
                <tr key={c.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">{c.nombre}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{fmt(c.importe)}</td>
                  <td className="px-5 py-4 text-slate-500">{c.descripcion || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal: Cobrar (cuotas del alumno) ─────────────────── */}
      <Modal
        open={modalCobrar}
        onClose={() => { setModalCobrar(false); setAlumnoCobrando(null); }}
        titulo={alumnoCobrando ? `Cuotas de ${alumnoCobrando.nombre} ${alumnoCobrando.apellido}` : 'Cobrar'}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['Concepto', 'Vencimiento', 'Importe', 'Pagado', 'Saldo', 'Estado', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cuotasAlumnoMock.map((c) => (
                <tr key={c.id} className="transition hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{c.concepto_nombre}</td>
                  <td className="px-4 py-3 text-slate-500">{fmtFecha(c.fecha_vencimiento)}</td>
                  <td className="px-4 py-3 text-slate-700">{fmt(c.importe)}</td>
                  <td className="px-4 py-3 text-slate-500">{fmt(c.importe_pagado)}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{fmt(c.saldo)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${estadoColor[c.estado] || ''}`}>{c.estado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => abrirPagar(c)} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">
                      Pagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      {/* ── Modal: Registrar pago ──────────────────────────────── */}
      <Modal open={modalPago} onClose={() => { setModalPago(false); setCuotaActiva(null); }} titulo="Registrar pago">
        <form onSubmit={(e) => { e.preventDefault(); simularGuardado(() => { setModalPago(false); setCuotaActiva(null); }); }} className="space-y-4">
          {cuotaActiva && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{cuotaActiva.concepto_nombre}</p>
              <p>Saldo pendiente: {fmt(cuotaActiva.saldo)}</p>
              <p>Vencimiento: {fmtFecha(cuotaActiva.fecha_vencimiento)}</p>
            </div>
          )}
          <div>
            <label className="text-sm font-semibold text-slate-700">Monto</label>
            <input type="number" required value={formPago.monto} onChange={(e) => setFormPago(p => ({ ...p, monto: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Medio de pago</label>
            <select value={formPago.medioPago} onChange={(e) => setFormPago(p => ({ ...p, medioPago: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              {mediosPago.map((m) => <option key={m} value={m} className="capitalize">{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Comprobante</label>
            <input value={formPago.comprobante} onChange={(e) => setFormPago(p => ({ ...p, comprobante: e.target.value }))} placeholder="Numero o referencia" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Observacion</label>
            <textarea rows={3} value={formPago.observacion} onChange={(e) => setFormPago(p => ({ ...p, observacion: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => { setModalPago(false); setCuotaActiva(null); }} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Registrando...' : 'Guardar pago'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Nuevo concepto ──────────────────────────────── */}
      <Modal open={modalConcepto} onClose={() => setModalConcepto(false)} titulo="Nuevo concepto de pago">
        <form onSubmit={(e) => { e.preventDefault(); simularGuardado(() => setModalConcepto(false)); }} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Nombre</label>
            <input required value={formConcepto.nombre} onChange={(e) => setFormConcepto(p => ({ ...p, nombre: e.target.value }))} placeholder="Ej. Cuota mayo" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Importe</label>
            <input required type="number" value={formConcepto.importe} onChange={(e) => setFormConcepto(p => ({ ...p, importe: e.target.value }))} placeholder="45000" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Descripcion</label>
            <textarea rows={3} value={formConcepto.descripcion} onChange={(e) => setFormConcepto(p => ({ ...p, descripcion: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none resize-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalConcepto(false)} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Guardando...' : 'Crear concepto'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Generar cuotas ──────────────────────────────── */}
      <Modal open={modalCuotas} onClose={() => setModalCuotas(false)} titulo="Generar cuotas por curso">
        <form onSubmit={(e) => { e.preventDefault(); simularGuardado(() => setModalCuotas(false)); }} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-700">Cursos</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setFormCuotas(p => ({ ...p, cursosIds: cursosOpc.map(c => c.id) }))} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Todos</button>
                <button type="button" onClick={() => setFormCuotas(p => ({ ...p, cursosIds: [] }))} className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition">Limpiar</button>
              </div>
            </div>
            <div className="grid max-h-44 grid-cols-2 gap-2 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3">
              {cursosOpc.map((c) => {
                const activo = formCuotas.cursosIds.includes(c.id);
                return (
                  <label key={c.id} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${activo ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700'}`}>
                    <input type="checkbox" checked={activo} onChange={() => toggleCurso(c.id)} className="shrink-0" />
                    <span className="font-medium">{c.nombre}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Concepto</label>
            <select value={formCuotas.conceptoPagoId} onChange={(e) => setFormCuotas(p => ({ ...p, conceptoPagoId: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
              <option value="">Seleccionar concepto</option>
              {conceptosData.map((c) => <option key={c.id} value={c.id}>{c.nombre} · {fmt(c.importe)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Fecha de vencimiento</label>
            <input type="date" value={formCuotas.fechaVencimiento} onChange={(e) => setFormCuotas(p => ({ ...p, fechaVencimiento: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalCuotas(false)} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Generando...' : 'Replicar cuotas'}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Modal: Dashboard ──────────────────────────────────── */}
      <Modal open={modalDashboard} onClose={() => setModalDashboard(false)} titulo="Dashboard financiero">
        <div className="space-y-5">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Cobrado vs Deuda — ultimos 3 meses</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dashChartData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: 12 }} formatter={(v) => [`$${Number(v).toLocaleString('es-AR')}`, '']} />
                <Bar dataKey="cobrado" name="Cobrado" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="deuda" name="Deuda" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Distribucion por medio de pago</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieMedios} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {pieMedios.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '16px', border: '1px solid #E2E8F0', fontSize: 12 }} formatter={(v) => [`${v}%`, '']} />
                <Legend formatter={(v) => <span style={{ fontSize: 11, color: '#64748B' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Modal>
    </div>
  );
}
