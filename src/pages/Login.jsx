import { useState } from 'react';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('demo123');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    await new Promise((r) => setTimeout(r, 700));
    if (email === 'admin@demo.com' && password === 'demo123') {
      onLogin();
    } else {
      setError('Credenciales incorrectas. Usa admin@demo.com / demo123');
    }
    setCargando(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Panel izquierdo */}
      <section className="relative hidden overflow-hidden p-10 text-white lg:flex lg:w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-slate-950 to-cyan-500/20" />
        <div className="relative z-10 flex w-full flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">EduGestion</h1>
              <p className="text-sm text-slate-300">Plataforma escolar integral</p>
            </div>
          </div>

          <div className="max-w-xl">
            <span className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm">
              Gestion academica, administrativa y familiar
            </span>
            <h2 className="text-5xl font-bold leading-tight">
              Todo tu colegio en una sola plataforma.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Alumnos, asistencia, calificaciones, pagos, comunicaciones y reportes en un panel moderno, seguro y facil de usar.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            Demo interactiva · Colegio San Martín · Buenos Aires, Argentina
          </p>
        </div>
      </section>

      {/* Panel derecho */}
      <section className="flex w-full items-center justify-center bg-slate-50 p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <GraduationCap size={28} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">EduGestion</h1>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Iniciar sesion</h2>
              <p className="mt-2 text-slate-500">Ingresa con tu usuario para acceder al panel.</p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={iniciarSesion} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="admin@demo.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">Contrasena</label>
                <div className="relative mt-2">
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    placeholder="Tu contrasena"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded-2xl bg-slate-950 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cargando ? 'Ingresando...' : 'Ingresar'}
              </button>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <p className="text-xs font-semibold text-slate-500">Credenciales de demo</p>
                <p className="mt-1 text-xs text-slate-400">admin@demo.com · demo123</p>
              </div>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            Sistema escolar SaaS · Panel administrativo
          </p>
        </div>
      </section>
    </div>
  );
}
