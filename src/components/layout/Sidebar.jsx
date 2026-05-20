import { X } from 'lucide-react';
import {
  LayoutDashboard, GraduationCap, BookOpen, CalendarCheck,
  Award, CreditCard, MessageSquare, CalendarDays,
  Users, ClipboardCheck, FileText, TrendingDown,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard',      label: 'Dashboard',             icon: LayoutDashboard },
  { id: 'alumnos',        label: 'Alumnos',               icon: GraduationCap },
  { id: 'cursos',         label: 'Cursos',                icon: BookOpen },
  { id: 'asistencias',    label: 'Asistencias',           icon: CalendarCheck },
  { id: 'calificaciones', label: 'Calificaciones',        icon: Award },
  { id: 'evaluaciones',   label: 'Evaluaciones',          icon: FileText },
  { id: 'pagos',          label: 'Pagos y cuotas',        icon: CreditCard },
  { id: 'egresos',        label: 'Egresos',               icon: TrendingDown },
  { id: 'comunicaciones', label: 'Comunicaciones',        icon: MessageSquare },
  { id: 'calendario',     label: 'Calendario escolar',    icon: CalendarDays },
  { id: 'inscripciones',  label: 'Inscripciones',         icon: ClipboardCheck },
  { id: 'usuarios',       label: 'Usuarios y roles',      icon: Users },
];

export default function Sidebar({ active, onNavigate, abierto, cerrar }) {
  return (
    <>
      {abierto && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-[2px] lg:hidden"
          onClick={cerrar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[86vw] max-w-72 flex-col overflow-hidden bg-slate-950 text-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.8)] transition-transform duration-300 ${
          abierto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-5 lg:px-6 lg:py-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">EduGestion</h1>
            <p className="mt-1 text-sm text-slate-400">Panel educativo</p>
          </div>
          <button
            onClick={cerrar}
            className="rounded-xl p-2 hover:bg-slate-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 min-h-0 space-y-1 overflow-y-auto px-3 py-4 lg:px-4 lg:py-5">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); cerrar?.(); }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-slate-950 shadow'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="rounded-2xl bg-slate-900 p-4">
            <p className="text-sm font-semibold">Rol actual</p>
            <p className="mt-1 text-xs text-slate-400">Administrador · Demo</p>
          </div>
        </div>
      </aside>
    </>
  );
}
