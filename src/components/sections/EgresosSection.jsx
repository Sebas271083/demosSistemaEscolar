import { useState } from 'react';
import { BarChart3, Plus, RefreshCw, Search, TrendingDown, X } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ComposedChart, Line, Legend
} from 'recharts';
import Modal from '../shared/Modal';

const CATEGORIAS = [
  { value: 'sueldo',        label: 'Sueldos y jornales',          color: 'bg-blue-50 text-blue-700' },
  { value: 'mantenimiento', label: 'Mantenimiento y reparaciones', color: 'bg-orange-50 text-orange-700' },
  { value: 'servicio',      label: 'Servicios',                    color: 'bg-purple-50 text-purple-700' },
  { value: 'alquiler',      label: 'Alquiler',                     color: 'bg-yellow-50 text-yellow-700' },
  { value: 'material',      label: 'Materiales y utiles',          color: 'bg-emerald-50 text-emerald-700' },
  { value: 'otro',          label: 'Otros',                        color: 'bg-slate-100 text-slate-600' },
];

const MEDIOS = ['efectivo', 'transferencia', 'cheque', 'tarjeta', 'otro'];

const COLORES_CAT = {
  sueldo: '#3b82f6', mantenimiento: '#f97316', servicio: '#a855f7',
  alquiler: '#eab308', material: '#10b981', otro: '#94a3b8',
};
const COLORES_MEDIO = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#94a3b8'];

const categoriaInfo = (value) => CATEGORIAS.find((c) => c.value === value) || { label: value, color: 'bg-slate-100 text-slate-600' };

const formatCurrency = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(Number(n) || 0);

const hoy = new Date().toISOString().slice(0, 10);
const primerDiaMes = (() => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
})();

const egresosIniciales = [
  { id: 1, fecha: '2026-05-01', categoria: 'sueldo',        descripcion: 'Sueldo mayo — Maria Garcia',       beneficiario: 'Maria Garcia',    medio_pago: 'transferencia', monto: 280000, comprobante: '', observacion: '' },
  { id: 2, fecha: '2026-05-01', categoria: 'sueldo',        descripcion: 'Sueldo mayo — Carlos Lopez',       beneficiario: 'Carlos Lopez',    medio_pago: 'transferencia', monto: 250000, comprobante: '', observacion: '' },
  { id: 3, fecha: '2026-05-03', categoria: 'servicio',      descripcion: 'Factura luz — mayo',               beneficiario: 'Empresa Electrica',medio_pago: 'transferencia',monto: 42500,  comprobante: 'F-0001-00001234', observacion: '' },
  { id: 4, fecha: '2026-05-05', categoria: 'mantenimiento', descripcion: 'Reparacion calefaccion',           beneficiario: 'Fontaneria SA',   medio_pago: 'efectivo',      monto: 18000,  comprobante: '', observacion: 'Urgente' },
  { id: 5, fecha: '2026-05-07', categoria: 'alquiler',      descripcion: 'Alquiler local — mayo',            beneficiario: 'Propietario SA',  medio_pago: 'transferencia', monto: 95000,  comprobante: '', observacion: '' },
  { id: 6, fecha: '2026-05-10', categoria: 'material',      descripcion: 'Utiles escolares 2do trimestre',   beneficiario: 'Libreria Central', medio_pago: 'tarjeta',      monto: 32400,  comprobante: 'FC-B-0002-0000891', observacion: '' },
  { id: 7, fecha: '2026-05-12', categoria: 'servicio',      descripcion: 'Plan internet — mayo',             beneficiario: 'Telecom',         medio_pago: 'debito',        monto: 8900,   comprobante: '', observacion: '' },
  { id: 8, fecha: '2026-05-15', categoria: 'otro',          descripcion: 'Gastos varios administrativos',    beneficiario: null,              medio_pago: 'efectivo',      monto: 5600,   comprobante: '', observacion: '' },
  { id: 9, fecha: '2026-05-18', categoria: 'mantenimiento', descripcion: 'Pintura salon principal',          beneficiario: 'Pinturas Gomez',  medio_pago: 'cheque',        monto: 55000,  comprobante: 'CHQ-8821', observacion: '' },
  { id: 10,fecha: '2026-05-20', categoria: 'sueldo',        descripcion: 'Honorarios docente especial',      beneficiario: 'Laura Perez',     medio_pago: 'transferencia', monto: 120000, comprobante: '', observacion: '' },
];

const resumenMock = [
  { categoria: 'sueldo',        total: 650000, cantidad: 3 },
  { categoria: 'alquiler',      total: 95000,  cantidad: 1 },
  { categoria: 'mantenimiento', total: 73000,  cantidad: 2 },
  { categoria: 'servicio',      total: 51400,  cantidad: 2 },
  { categoria: 'material',      total: 32400,  cantidad: 1 },
  { categoria: 'otro',          total: 5600,   cantidad: 1 },
];

const evolucionMock = [
  { mes: '2026-02', cobrado: 780000, egresado: 650000, neto: 130000 },
  { mes: '2026-03', cobrado: 820000, egresado: 710000, neto: 110000 },
  { mes: '2026-04', cobrado: 790000, egresado: 860000, neto: -70000 },
  { mes: '2026-05', cobrado: 840000, egresado: 907400, neto: -67400 },
];

const medioPagoMock = [
  { medio_pago: 'transferencia', total: 745000 },
  { medio_pago: 'efectivo',      total: 23600 },
  { medio_pago: 'tarjeta',       total: 32400 },
  { medio_pago: 'cheque',        total: 55000 },
];

const porCategoriaMock = resumenMock.map((r) => ({
  ...r, label: { sueldo: 'Sueldos', mantenimiento: 'Mantenimiento', servicio: 'Servicios', alquiler: 'Alquiler', material: 'Materiales', otro: 'Otros' }[r.categoria] || r.categoria,
}));

const NOMBRES_MES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const formatMes = (mes) => { const m = parseInt(mes?.split('-')[1], 10); return NOMBRES_MES[m - 1] || mes; };
const formatMiles = (v) => `$${(Number(v) / 1000).toFixed(0)}k`;

const formInicial = {
  categoria: 'sueldo', descripcion: '', monto: '', fecha: hoy,
  medioPago: 'efectivo', beneficiario: '', comprobante: '', observacion: '',
};

export default function EgresosSection() {
  const [egresos, setEgresos] = useState(egresosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [fechaDesde, setFechaDesde] = useState(primerDiaMes);
  const [fechaHasta, setFechaHasta] = useState(hoy);

  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(formInicial);
  const [guardando, setGuardando] = useState(false);
  const [dashboardAbierto, setDashboardAbierto] = useState(false);

  const filtrados = egresos.filter((e) => {
    if (categoriaFiltro && e.categoria !== categoriaFiltro) return false;
    if (e.fecha < fechaDesde || e.fecha > fechaHasta) return false;
    const q = busqueda.toLowerCase();
    return !q || e.descripcion.toLowerCase().includes(q) || (e.beneficiario || '').toLowerCase().includes(q);
  });

  const totalPeriodo = filtrados.reduce((acc, e) => acc + Number(e.monto), 0);

  const abrirNuevo = () => { setEditando(null); setForm(formInicial); setModal(true); };
  const abrirEditar = (eg) => {
    setEditando(eg);
    setForm({
      categoria: eg.categoria, descripcion: eg.descripcion, monto: eg.monto,
      fecha: eg.fecha, medioPago: eg.medio_pago, beneficiario: eg.beneficiario || '',
      comprobante: eg.comprobante || '', observacion: eg.observacion || '',
    });
    setModal(true);
  };
  const cerrarModal = () => { setModal(false); setEditando(null); setForm(formInicial); };

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 500));
    if (editando) {
      setEgresos((prev) => prev.map((eg) =>
        eg.id === editando.id
          ? { ...eg, ...form, monto: Number(form.monto), medio_pago: form.medioPago }
          : eg
      ));
    } else {
      setEgresos((prev) => [...prev, {
        ...form, id: Date.now(), monto: Number(form.monto), medio_pago: form.medioPago,
      }]);
    }
    setGuardando(false);
    cerrarModal();
  };

  const eliminar = (eg) => {
    if (!window.confirm(`Vas a eliminar "${eg.descripcion}" por ${formatCurrency(eg.monto)}. Esta accion no se puede deshacer.`)) return;
    setEgresos((prev) => prev.filter((e) => e.id !== eg.id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Egresos institucionales</h1>
          <p className="mt-1 text-slate-500">Registra y consulta todos los gastos del colegio.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <RefreshCw size={16} /> Actualizar
          </button>
          <button
            onClick={() => setDashboardAbierto(true)}
            className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <BarChart3 size={16} /> Dashboard
          </button>
          <button
            onClick={abrirNuevo}
            className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            <Plus size={16} /> Nuevo egreso
          </button>
        </div>
      </section>

      {/* KPI cards */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-2">
              <TrendingDown size={22} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Total del periodo</p>
              <p className="text-xl font-bold text-slate-900">{formatCurrency(totalPeriodo)}</p>
            </div>
          </div>
        </div>
        {resumenMock.slice(0, 3).map((item) => {
          const info = categoriaInfo(item.categoria);
          return (
            <div key={item.categoria} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${info.color}`}>{info.label}</span>
              <p className="mt-2 text-xl font-bold text-slate-900">{formatCurrency(item.total)}</p>
              <p className="text-xs text-slate-400">{item.cantidad} movimiento{item.cantidad !== 1 ? 's' : ''}</p>
            </div>
          );
        })}
      </section>

      {/* Filtros */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Filtros</h2>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar descripcion o beneficiario..."
              className="h-11 w-full rounded-2xl border border-slate-300 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="h-11 rounded-2xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 xl:w-52"
          >
            <option value="">Todas las categorias</option>
            {CATEGORIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <input
            type="date" value={fechaDesde} onChange={(e) => setFechaDesde(e.target.value)}
            className="h-11 rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 xl:w-40"
          />
          <input
            type="date" value={fechaHasta} onChange={(e) => setFechaHasta(e.target.value)}
            className="h-11 rounded-2xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 xl:w-40"
          />
          <button className="h-11 shrink-0 rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white hover:bg-slate-800 transition">
            Aplicar
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Egresos ({filtrados.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {['Fecha', 'Categoria', 'Descripcion', 'Beneficiario', 'Medio', 'Monto', 'Acciones'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((eg) => {
                const info = categoriaInfo(eg.categoria);
                return (
                  <tr key={eg.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{eg.fecha}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${info.color}`}>{info.label}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-700 max-w-xs truncate">{eg.descripcion}</td>
                    <td className="px-5 py-4 text-slate-500">{eg.beneficiario || <span className="text-slate-300">-</span>}</td>
                    <td className="px-5 py-4 text-slate-500 capitalize">{eg.medio_pago}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">{formatCurrency(eg.monto)}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => abrirEditar(eg)}
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminar(eg)}
                          className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">
                    No hay egresos registrados para el periodo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Mostrando {filtrados.length} de {egresos.length}</span>
          <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 transition disabled:opacity-40" disabled>Anterior</button>
            <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 transition" disabled>Siguiente</button>
          </div>
        </div>
      </div>

      {/* Modal alta/edición */}
      <Modal open={modal} onClose={cerrarModal} titulo={editando ? 'Editar egreso' : 'Nuevo egreso'}>
        <form onSubmit={guardar} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {CATEGORIAS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Descripcion</label>
            <input
              required value={form.descripcion}
              onChange={(e) => setForm((p) => ({ ...p, descripcion: e.target.value }))}
              placeholder="Ej. Sueldo junio — Juan Perez"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Monto</label>
              <input
                required type="number" value={form.monto}
                onChange={(e) => setForm((p) => ({ ...p, monto: e.target.value }))}
                placeholder="0.00"
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Fecha</label>
              <input
                required type="date" value={form.fecha}
                onChange={(e) => setForm((p) => ({ ...p, fecha: e.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Medio de pago</label>
            <select
              value={form.medioPago}
              onChange={(e) => setForm((p) => ({ ...p, medioPago: e.target.value }))}
              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {MEDIOS.map((m) => <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Beneficiario (opcional)</label>
            <input
              value={form.beneficiario}
              onChange={(e) => setForm((p) => ({ ...p, beneficiario: e.target.value }))}
              placeholder="Nombre del empleado, proveedor, etc."
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Comprobante / N° factura (opcional)</label>
            <input
              value={form.comprobante}
              onChange={(e) => setForm((p) => ({ ...p, comprobante: e.target.value }))}
              placeholder="Ej. F-0001-00000123"
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Observacion (opcional)</label>
            <textarea
              rows={3} value={form.observacion}
              onChange={(e) => setForm((p) => ({ ...p, observacion: e.target.value }))}
              placeholder="Notas adicionales"
              className="mt-2 w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={cerrarModal} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
              Cancelar
            </button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Registrar egreso'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dashboard modal */}
      {dashboardAbierto && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pb-10 pt-8">
          <div className="w-full max-w-5xl rounded-3xl bg-slate-50 shadow-2xl">
            <div className="flex items-center justify-between rounded-t-3xl border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Dashboard de egresos</h2>
                <p className="text-sm text-slate-500">Analisis financiero — ultimos meses</p>
              </div>
              <button onClick={() => setDashboardAbierto(false)} className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6 p-6">
              {/* Evolucion mensual */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="mb-1 text-sm font-semibold text-slate-800">Ingresos vs Egresos por mes</h3>
                <p className="mb-4 text-xs text-slate-400">La linea muestra el resultado neto mensual</p>
                <ResponsiveContainer width="100%" height={260}>
                  <ComposedChart data={evolucionMock} margin={{ top: 8, right: 16, left: 8, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="mes" tickFormatter={formatMes} tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={formatMiles} width={54} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={formatMiles} width={54} />
                    <Tooltip formatter={(v, name) => [formatCurrency(v), name === 'cobrado' ? 'Cobrado' : name === 'egresado' ? 'Egresado' : 'Neto']} />
                    <Legend formatter={(v) => v === 'cobrado' ? 'Cobrado' : v === 'egresado' ? 'Egresado' : 'Neto'} />
                    <Bar yAxisId="left" dataKey="cobrado"  fill="#10b981" radius={[4,4,0,0]} name="cobrado" />
                    <Bar yAxisId="left" dataKey="egresado" fill="#ef4444" radius={[4,4,0,0]} name="egresado" />
                    <Line yAxisId="right" dataKey="neto" type="monotone" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} name="neto" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
                {/* Por categoria */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-4 text-sm font-semibold text-slate-800">Egresos por categoria</h3>
                  <ResponsiveContainer width="100%" height={porCategoriaMock.length * 48 + 20}>
                    <BarChart layout="vertical" data={porCategoriaMock} margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={formatMiles} />
                      <YAxis dataKey="label" type="category" width={120} tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(v) => [formatCurrency(v), 'Egresado']} />
                      <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                        {porCategoriaMock.map((entry) => (
                          <Cell key={entry.categoria} fill={COLORES_CAT[entry.categoria] || '#94a3b8'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Por medio de pago */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="mb-4 text-sm font-semibold text-slate-800">Por medio de pago</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={medioPagoMock} dataKey="total" nameKey="medio_pago"
                        cx="50%" cy="50%" outerRadius={75}
                        label={({ medio_pago, percent }) => `${medio_pago} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {medioPagoMock.map((_, i) => (
                          <Cell key={i} fill={COLORES_MEDIO[i % COLORES_MEDIO.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => [formatCurrency(v), 'Total']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3 space-y-1">
                    {medioPagoMock.map((m, i) => (
                      <div key={m.medio_pago} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORES_MEDIO[i % COLORES_MEDIO.length] }} />
                          {m.medio_pago}
                        </span>
                        <span className="font-medium text-slate-700">{formatCurrency(m.total)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
