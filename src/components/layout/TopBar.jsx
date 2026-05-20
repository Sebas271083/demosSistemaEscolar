import { Bell, LogOut, Menu, Search } from 'lucide-react';

const sectionMeta = {
  dashboard:      { label: 'Dashboard',           description: 'Resumen general academico, administrativo y financiero.' },
  alumnos:        { label: 'Alumnos',             description: 'Alta, edicion y seguimiento de alumnos.' },
  cursos:         { label: 'Cursos',              description: 'Cursos, divisiones, cupos y ciclo lectivo.' },
  asistencias:    { label: 'Asistencias',         description: 'Registro diario y consulta historica de asistencia.' },
  calificaciones: { label: 'Calificaciones',      description: 'Carga y consulta de notas por alumno y materia.' },
  evaluaciones:   { label: 'Evaluaciones',        description: 'Planificacion de evaluaciones y calendario academico.' },
  pagos:          { label: 'Pagos y cuotas',      description: 'Cobranza, deuda y vencimientos por alumno.' },
  egresos:        { label: 'Egresos institucionales', description: 'Registro de gastos institucionales.' },
  comunicaciones: { label: 'Comunicaciones',      description: 'Mensajeria general, por curso e individual.' },
  calendario:     { label: 'Calendario escolar',  description: 'Agenda institucional y academica.' },
  inscripciones:  { label: 'Inscripcion y matriculacion', description: 'Matricula, preinscripciones y estados.' },
  usuarios:       { label: 'Usuarios y roles',    description: 'Administracion de usuarios, roles y activacion.' },
};

export default function TopBar({ active, onMenuClick, onLogout }) {
  const meta = sectionMeta[active] || sectionMeta.dashboard;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/82">
      <div className="flex min-h-[4.5rem] items-center justify-between gap-3 px-4 py-3 md:h-20 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-2xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="min-w-0">
            <h2 className="line-clamp-1 text-lg font-bold leading-tight text-slate-900 md:text-xl">
              {meta.label}
            </h2>
            <p className="mt-0.5 hidden truncate text-sm text-slate-500 sm:block">
              {meta.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <div className="hidden w-64 items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 md:flex">
            <Search size={18} className="text-slate-400" />
            <input className="w-full bg-transparent text-sm outline-none" placeholder="Buscar..." />
          </div>

          <button className="relative rounded-2xl p-2 hover:bg-slate-100">
            <Bell size={20} />
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">Juan García</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
              J
            </div>
          </div>

          <button
            onClick={onLogout}
            className="rounded-2xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            title="Cerrar sesion"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
