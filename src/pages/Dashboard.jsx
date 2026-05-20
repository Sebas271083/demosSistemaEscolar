import Layout from '../components/layout/Layout';
import DashboardHome from '../components/sections/DashboardHome';
import AlumnosSection from '../components/sections/AlumnosSection';
import CursosSection from '../components/sections/CursosSection';
import AttendanceSection from '../components/sections/AttendanceSection';
import GradesSection from '../components/sections/GradesSection';
import TasksSection from '../components/sections/TasksSection';
import PaymentsSection from '../components/sections/PaymentsSection';
import ComunicacionesSection from '../components/sections/ComunicacionesSection';
import CalendarSection from '../components/sections/CalendarSection';
import UsersSection from '../components/sections/UsersSection';
import EgresosSection from '../components/sections/EgresosSection';

function Placeholder({ titulo, descripcion }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100">
        <span className="text-2xl font-bold text-slate-400">{titulo[0]}</span>
      </div>
      <h2 className="text-xl font-bold text-slate-800">{titulo}</h2>
      <p className="mt-2 text-sm text-slate-400">{descripcion}</p>
    </div>
  );
}

const sections = {
  dashboard: DashboardHome,
  alumnos: AlumnosSection,
  cursos: CursosSection,
  asistencias: AttendanceSection,
  calificaciones: GradesSection,
  evaluaciones: TasksSection,
  pagos: PaymentsSection,
  egresos: EgresosSection,
  comunicaciones: ComunicacionesSection,
  calendario: CalendarSection,
  inscripciones: () => <Placeholder titulo="Inscripciones" descripcion="Gestion de inscripciones para el ciclo lectivo." />,
  usuarios: UsersSection,
  personal: () => <Placeholder titulo="Personal" descripcion="Gestion del personal docente y administrativo." />,
};

export default function Dashboard({ active, onNavigate, onLogout }) {
  const Section = sections[active] || DashboardHome;

  return (
    <Layout active={active} onNavigate={onNavigate} onLogout={onLogout}>
      <Section onNavigate={onNavigate} />
    </Layout>
  );
}
