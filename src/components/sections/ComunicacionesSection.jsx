import { useState } from 'react';
import { Plus, RefreshCw, Eye, Inbox, Send, Mail } from 'lucide-react';
import Modal from '../shared/Modal';
import { anuncios } from '../../data/mockData';

const prioridadClass = (p) => {
  if (p === 'urgente') return 'bg-red-100 text-red-700';
  if (p === 'alta') return 'bg-amber-100 text-amber-700';
  if (p === 'normal') return 'bg-blue-100 text-blue-700';
  return 'bg-slate-100 text-slate-700';
};

const categoriaConfig = {
  institucional: { label: 'Institucional', color: 'bg-blue-50 text-blue-700', borde: 'border-l-blue-500' },
  pagos: { label: 'Pagos', color: 'bg-amber-50 text-amber-700', borde: 'border-l-amber-500' },
  academico: { label: 'Academico', color: 'bg-emerald-50 text-emerald-700', borde: 'border-l-emerald-500' },
};

const formInicial = {
  titulo: '',
  mensaje: '',
  prioridad: 'normal',
  canal: 'interno',
  estado: 'publicada',
  scope: 'institucion',
  scopeId: '',
};

const enviadas = anuncios.map((a) => ({
  ...a,
  prioridad: a.id === 1 ? 'normal' : a.id === 2 ? 'alta' : 'baja',
  canal: 'interno',
  scope: 'institucion',
  leidos: a.vistos,
  total: 180,
}));

const recibidas = [
  { id: 10, titulo: 'Reunion de equipo docente', autor: 'Directora M. Gonzalez', fecha: '21/05/2026', contenido: 'Se convoca a todos los docentes a una reunion informativa el dia viernes 23 de mayo a las 14 hs en la sala de reunion.', prioridad: 'alta', leido: false },
  { id: 11, titulo: 'Actualizacion del reglamento interno', autor: 'Secretaria', fecha: '19/05/2026', contenido: 'Se adjunta la version actualizada del reglamento interno 2026. Por favor leer y firmar el acuse de recibo.', prioridad: 'normal', leido: true },
];

export default function ComunicacionesSection() {
  const [tab, setTab] = useState('enviadas');
  const [seleccionada, setSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState(formInicial);

  const lista = tab === 'enviadas' ? enviadas : recibidas;

  const enviarComunicado = async (e) => {
    e.preventDefault();
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 600));
    setGuardando(false);
    setModalAbierto(false);
    setForm(formInicial);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Comunicaciones</h1>
          <p className="mt-1 text-slate-500">Mensajeria general, por curso e individual.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            <RefreshCw size={18} />
            Actualizar
          </button>
          <button
            onClick={() => setModalAbierto(true)}
            className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
          >
            <Plus size={18} />
            Nuevo comunicado
          </button>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Lista */}
        <div className="lg:col-span-1 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button
              onClick={() => { setTab('enviadas'); setSeleccionada(null); }}
              className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold transition ${tab === 'enviadas' ? 'border-b-2 border-slate-950 text-slate-950' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Send size={15} /> Enviadas
            </button>
            <button
              onClick={() => { setTab('recibidas'); setSeleccionada(null); }}
              className={`flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold transition ${tab === 'recibidas' ? 'border-b-2 border-slate-950 text-slate-950' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Inbox size={15} /> Recibidas
              {recibidas.filter((r) => !r.leido).length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {recibidas.filter((r) => !r.leido).length}
                </span>
              )}
            </button>
          </div>

          {/* Items */}
          <div className="divide-y divide-slate-50">
            {lista.map((item) => (
              <button
                key={item.id}
                onClick={() => setSeleccionada(item)}
                className={`w-full px-4 py-4 text-left transition hover:bg-slate-50 ${seleccionada?.id === item.id ? 'bg-slate-50' : ''}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`text-sm font-semibold text-slate-900 line-clamp-1 ${tab === 'recibidas' && !item.leido ? 'font-bold' : ''}`}>{item.titulo}</p>
                  {item.prioridad && item.prioridad !== 'normal' && (
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${prioridadClass(item.prioridad)}`}>{item.prioridad}</span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{item.autor || item.fecha}</p>
                <p className="mt-1 text-xs text-slate-500 line-clamp-2">{item.contenido}</p>
                {tab === 'enviadas' && item.leidos !== undefined && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <Eye size={11} />
                    <span>{item.leidos} de {item.total} visualizaciones</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Detalle */}
        <div className="lg:col-span-2 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          {seleccionada ? (
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  {seleccionada.categoria && (
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-2 ${(categoriaConfig[seleccionada.categoria] || categoriaConfig.institucional).color}`}>
                      {(categoriaConfig[seleccionada.categoria] || categoriaConfig.institucional).label}
                    </span>
                  )}
                  {seleccionada.prioridad && (
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold mb-2 ml-2 ${prioridadClass(seleccionada.prioridad)}`}>
                      Prioridad {seleccionada.prioridad}
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-slate-900">{seleccionada.titulo}</h2>
                  <p className="mt-1 text-sm text-slate-400">{seleccionada.autor} · {seleccionada.fecha}</p>
                </div>
                {tab === 'enviadas' && (
                  <div className="shrink-0 flex gap-2">
                    <button className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Editar</button>
                    <button className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition">Eliminar</button>
                  </div>
                )}
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-sm text-slate-700 leading-relaxed">
                {seleccionada.contenido}
              </div>
              {tab === 'enviadas' && seleccionada.leidos !== undefined && (
                <div className="mt-4 rounded-2xl border border-slate-100 bg-white px-5 py-4">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Estadisticas de envio</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{seleccionada.leidos}</p>
                      <p className="text-xs text-slate-400">Visualizaciones</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-700">{Math.round((seleccionada.leidos / seleccionada.total) * 100)}%</p>
                      <p className="text-xs text-slate-400">Tasa de apertura</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{seleccionada.total}</p>
                      <p className="text-xs text-slate-400">Destinatarios</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-100">
                <Mail size={24} className="text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700">Selecciona un comunicado</h3>
              <p className="mt-1 text-sm text-slate-400">Haz clic en un item de la lista para ver el detalle.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal nuevo comunicado */}
      <Modal open={modalAbierto} onClose={() => setModalAbierto(false)} titulo="Nuevo comunicado">
        <form onSubmit={enviarComunicado} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Titulo</label>
            <input required value={form.titulo} onChange={(e) => setForm(p => ({ ...p, titulo: e.target.value }))} placeholder="Asunto del comunicado" className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Mensaje</label>
            <textarea required rows={4} value={form.mensaje} onChange={(e) => setForm(p => ({ ...p, mensaje: e.target.value }))} placeholder="Escribi el contenido del comunicado..." className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Prioridad</label>
              <select value={form.prioridad} onChange={(e) => setForm(p => ({ ...p, prioridad: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                {['baja', 'normal', 'alta', 'urgente'].map((p) => <option key={p} value={p} className="capitalize">{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Canal</label>
              <select value={form.canal} onChange={(e) => setForm(p => ({ ...p, canal: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                {[{ value: 'interno', label: 'Interno' }, { value: 'email', label: 'Email' }, { value: 'mixto', label: 'Mixto' }].map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">Destino</label>
              <select value={form.scope} onChange={(e) => setForm(p => ({ ...p, scope: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                {[{ value: 'institucion', label: 'Toda la institucion' }, { value: 'curso', label: 'Curso' }, { value: 'alumno', label: 'Alumno' }, { value: 'usuario', label: 'Usuario' }].map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Estado</label>
              <select value={form.estado} onChange={(e) => setForm(p => ({ ...p, estado: e.target.value }))} className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option value="publicada">Publicada</option>
                <option value="borrador">Borrador</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModalAbierto(false)} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancelar</button>
            <button type="submit" disabled={guardando} className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60">
              {guardando ? 'Enviando...' : 'Enviar comunicado'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
