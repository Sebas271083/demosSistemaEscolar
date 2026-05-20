import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus } from 'lucide-react';
import { eventos } from '../../data/mockData';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarSection() {
  const today = new Date(2026, 4, 20);
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4);
  const [selected, setSelected] = useState(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const eventDays = eventos.flatMap((e) => e.dias);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelected(null);
  };

  const selectedEvents = selected
    ? eventos.filter((e) => e.dias.includes(selected) && e.fecha.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
    : [];

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calendario</h1>
          <p className="mt-1 text-slate-500">Eventos, examenes y reuniones institucionales.</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
          <Plus size={18} />
          Nuevo evento
        </button>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {MONTHS[month]} {year}
            </h2>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextMonth} className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
              const hasEvent = year === 2026 && month === 4 && eventDays.includes(day);
              const isSelected = selected === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelected(day === selected ? null : day)}
                  className={`relative flex flex-col items-center justify-center h-10 w-full rounded-2xl text-sm font-medium transition ${
                    isSelected
                      ? 'bg-slate-950 text-white'
                      : isToday
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {day}
                  {hasEvent && (
                    <span className={`absolute bottom-1 h-1 w-1 rounded-full ${isSelected ? 'bg-white/60' : 'bg-orange-400'}`} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
            {[
              { label: 'Reunion', color: 'bg-blue-500' },
              { label: 'Evaluacion', color: 'bg-orange-500' },
              { label: 'Administrativo', color: 'bg-red-500' },
              { label: 'Institucional', color: 'bg-emerald-500' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className={`h-2 w-2 rounded-full ${l.color}`} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            {selected ? `${selected} de ${MONTHS[month]}` : 'Proximos eventos'}
          </h3>
          <div className="space-y-3">
            {(selected ? selectedEvents : eventos).length > 0 ? (
              (selected ? selectedEvents : eventos).map((ev) => (
                <div key={ev.id} className={`rounded-2xl border ${ev.bgLight} p-4`} style={{ borderColor: 'transparent' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${ev.color}`} />
                    <p className={`font-semibold text-sm ${ev.textColor}`}>{ev.titulo}</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock size={12} />
                      {ev.hora}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin size={12} />
                      {ev.lugar}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-slate-400">
                No hay eventos para este dia
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
