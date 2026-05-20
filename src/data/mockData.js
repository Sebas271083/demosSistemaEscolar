export const escuela = {
  nombre: 'Colegio San Martín',
  ciudad: 'Buenos Aires, Argentina',
  director: 'Lic. María González',
  email: 'contacto@colegiosanmartin.edu.ar',
  telefono: '+54 11 1234-5678',
  año: 2026,
};

export const userLogeado = {
  nombre: 'Juan García',
  email: 'admin@colegiosanmartin.edu.ar',
  rol: 'Administrador',
  initials: 'JG',
};

export const alumnos = [
  { id: 1, nombre: 'Juan García Ruiz', año: '3º A', email: 'juan.garcia@mail.com', estado: 'Activo', initials: 'JG' },
  { id: 2, nombre: 'María López Sánchez', año: '3º A', email: 'maria.lopez@mail.com', estado: 'Activo', initials: 'ML' },
  { id: 3, nombre: 'Carlos Ruiz Pérez', año: '3º A', email: 'carlos.ruiz@mail.com', estado: 'Activo', initials: 'CR' },
  { id: 4, nombre: 'Ana Martínez García', año: '3º A', email: 'ana.martinez@mail.com', estado: 'Activo', initials: 'AM' },
  { id: 5, nombre: 'Roberto González López', año: '3º A', email: 'roberto.gonzalez@mail.com', estado: 'Activo', initials: 'RG' },
  { id: 6, nombre: 'Sofía Díaz Romero', año: '3º A', email: 'sofia.diaz@mail.com', estado: 'Activo', initials: 'SD' },
  { id: 7, nombre: 'Pablo Fernández Cruz', año: '3º B', email: 'pablo.fernandez@mail.com', estado: 'Activo', initials: 'PF' },
  { id: 8, nombre: 'Laura Sánchez Moreno', año: '3º B', email: 'laura.sanchez@mail.com', estado: 'Activo', initials: 'LS' },
  { id: 9, nombre: 'Diego Torres Acosta', año: '4º A', email: 'diego.torres@mail.com', estado: 'Activo', initials: 'DT' },
  { id: 10, nombre: 'Valentina Herrera Paz', año: '4º A', email: 'valentina.herrera@mail.com', estado: 'Activo', initials: 'VH' },
];

export const docentes = [
  { id: 1, nombre: 'Prof. Carlos Mendoza', materia: 'Matemática', email: 'carlos@colegiosanmartin.edu.ar', initials: 'CM', color: 'bg-blue-100 text-blue-700' },
  { id: 2, nombre: 'Dra. Ana Rodríguez', materia: 'Español', email: 'ana@colegiosanmartin.edu.ar', initials: 'AR', color: 'bg-violet-100 text-violet-700' },
  { id: 3, nombre: 'Ing. Roberto Silva', materia: 'Ciencias', email: 'roberto@colegiosanmartin.edu.ar', initials: 'RS', color: 'bg-emerald-100 text-emerald-700' },
  { id: 4, nombre: 'Prof. Mariana Torres', materia: 'Inglés', email: 'mariana@colegiosanmartin.edu.ar', initials: 'MT', color: 'bg-amber-100 text-amber-700' },
];

export const chats = [
  {
    id: 1,
    participante: 'María González',
    rol: 'Madre de Juan García',
    initials: 'MG',
    color: 'bg-pink-100 text-pink-700',
    lastMessage: 'Hola, ¿cómo le fue hoy a Juan?',
    timestamp: 'Hoy 14:30',
    unread: 2,
    online: true,
    messages: [
      { id: 1, from: 'user', text: 'Hola María! Todo bien por acá.', timestamp: '14:25' },
      { id: 2, from: 'other', text: '¡Qué bueno! ¿Cómo está yendo el trimestre?', timestamp: '14:27' },
      { id: 3, from: 'other', text: 'Hola, ¿cómo le fue hoy a Juan?', timestamp: '14:30' },
      { id: 4, from: 'user', text: 'Le fue muy bien! Sacó 9 en la evaluación de matemática.', timestamp: '14:31' },
      { id: 5, from: 'other', text: '¡Excelente! ¡Qué buena noticia! 🎉', timestamp: '14:32' },
    ],
  },
  {
    id: 2,
    participante: 'Prof. Carlos Mendoza',
    rol: 'Docente de Matemática',
    initials: 'CM',
    color: 'bg-blue-100 text-blue-700',
    lastMessage: 'Las tareas están cargadas en el portal',
    timestamp: 'Ayer 15:45',
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: 'other', text: 'Buen día, les comento que ya cargué las tareas de la semana.', timestamp: '15:40' },
      { id: 2, from: 'other', text: 'Las tareas están cargadas en el portal', timestamp: '15:45' },
      { id: 3, from: 'user', text: 'Perfecto, gracias Carlos!', timestamp: '15:50' },
    ],
  },
  {
    id: 3,
    participante: 'Dra. Ana Rodríguez',
    rol: 'Docente de Español',
    initials: 'AR',
    color: 'bg-violet-100 text-violet-700',
    lastMessage: 'Recordatorio: Entrega de trabajos mañana',
    timestamp: 'Hace 2 días',
    unread: 1,
    online: true,
    messages: [
      { id: 1, from: 'other', text: 'Recordatorio: Entrega de trabajos mañana', timestamp: '10:00' },
    ],
  },
  {
    id: 4,
    participante: 'Pedro López',
    rol: 'Padre de María López',
    initials: 'PL',
    color: 'bg-orange-100 text-orange-700',
    lastMessage: 'Gracias por la información',
    timestamp: 'Hace 3 días',
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: 'user', text: 'Hola Pedro, le informamos que María tuvo un excelente desempeño.', timestamp: '09:00' },
      { id: 2, from: 'other', text: 'Gracias por la información', timestamp: '09:30' },
    ],
  },
];

export const eventos = [
  { id: 1, titulo: 'Reunión de padres', fecha: '2026-05-25', hora: '15:00 - 17:00', lugar: 'Salón de actos', tipo: 'reunion', color: 'bg-blue-500', textColor: 'text-blue-700', bgLight: 'bg-blue-50', dias: [25] },
  { id: 2, titulo: 'Evaluación trimestral', fecha: '2026-05-27', hora: '09:00 - 12:00', lugar: 'Todas las aulas', tipo: 'evaluacion', color: 'bg-orange-500', textColor: 'text-orange-700', bgLight: 'bg-orange-50', dias: [27, 28] },
  { id: 3, titulo: 'Cierre de trimestre', fecha: '2026-05-31', hora: '10:00 - 12:00', lugar: 'Dirección', tipo: 'administrativo', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50', dias: [31] },
  { id: 4, titulo: 'Jornada institucional', fecha: '2026-05-22', hora: '08:00 - 13:00', lugar: 'Todo el colegio', tipo: 'institucional', color: 'bg-emerald-500', textColor: 'text-emerald-700', bgLight: 'bg-emerald-50', dias: [22] },
];

export const tareas = [
  { id: 1, titulo: 'Lectura cap. 5 - Historia', asignadoA: '3º Año A', fechaVencimiento: '25/05/2026', estado: 'completada', docente: 'Prof. Silva', materia: 'Historia', progreso: 100 },
  { id: 2, titulo: 'Problemario de matemática', asignadoA: '3º Año A', fechaVencimiento: '26/05/2026', estado: 'pendiente', docente: 'Prof. Mendoza', materia: 'Matemática', progreso: 0 },
  { id: 3, titulo: 'Redacción español - Cuento', asignadoA: '2º Año', fechaVencimiento: '27/05/2026', estado: 'en_progreso', docente: 'Dra. Rodríguez', materia: 'Español', progreso: 45 },
  { id: 4, titulo: 'Experimento de ciencias - Osmosis', asignadoA: '3º Año A', fechaVencimiento: '28/05/2026', estado: 'pendiente', docente: 'Ing. Silva', materia: 'Ciencias', progreso: 0 },
  { id: 5, titulo: 'Vocabulario inglés - Unit 8', asignadoA: '4º Año', fechaVencimiento: '29/05/2026', estado: 'completada', docente: 'Prof. Torres', materia: 'Inglés', progreso: 100 },
  { id: 6, titulo: 'Mapa conceptual - Revolución Industrial', asignadoA: '3º Año B', fechaVencimiento: '30/05/2026', estado: 'en_progreso', docente: 'Prof. Silva', materia: 'Historia', progreso: 60 },
];

export const anuncios = [
  {
    id: 1,
    titulo: 'Inicio oficial del tercer trimestre',
    autor: 'Dirección',
    fecha: '22/05/2026',
    contenido: 'Nos complace comunicar el inicio oficial del tercer trimestre lectivo. Les recordamos que el horario de ingreso es de 8:00 AM a 3:00 PM. Cualquier consulta, el equipo de dirección está a disposición.',
    vistos: 145,
    categoria: 'institucional',
  },
  {
    id: 2,
    titulo: 'Recordatorio: Vencimiento de cuota mayo',
    autor: 'Administración',
    fecha: '20/05/2026',
    contenido: 'Le recordamos que el pago de la cuota del mes de mayo vence el próximo 25 de mayo. Puede abonar de forma online mediante la plataforma, transferencia bancaria o efectivo en secretaría.',
    vistos: 98,
    categoria: 'pagos',
  },
  {
    id: 3,
    titulo: 'Modificación de horarios - Semana del 27/05',
    autor: 'Dirección',
    fecha: '18/05/2026',
    contenido: 'Durante la semana de evaluaciones trimestral (27 al 30 de mayo), el horario de salida se adelantará a las 12:00 hs. Los alumnos de 3º año ingresan en el turno habitual.',
    vistos: 67,
    categoria: 'academico',
  },
];

export const asistenciaInicial = [
  { id: 1, nombre: 'Juan García Ruiz', numero: 1, presente: true },
  { id: 2, nombre: 'María López Sánchez', numero: 2, presente: true },
  { id: 3, nombre: 'Carlos Ruiz Pérez', numero: 3, presente: false },
  { id: 4, nombre: 'Ana Martínez García', numero: 4, presente: true },
  { id: 5, nombre: 'Roberto González López', numero: 5, presente: true },
  { id: 6, nombre: 'Sofía Díaz Romero', numero: 6, presente: true },
  { id: 7, nombre: 'Pablo Fernández Cruz', numero: 7, presente: false },
  { id: 8, nombre: 'Laura Sánchez Moreno', numero: 8, presente: true },
  { id: 9, nombre: 'Diego Torres Acosta', numero: 9, presente: true },
  { id: 10, nombre: 'Valentina Herrera Paz', numero: 10, presente: true },
];

export const calificaciones = [
  { id: 1, alumno: 'García Ruiz, Juan', mat: 9, esp: 8, cie: 9, ing: 8, ef: 10 },
  { id: 2, alumno: 'López Sánchez, María', mat: 8, esp: 9, cie: 8, ing: 9, ef: 9 },
  { id: 3, alumno: 'Ruiz Pérez, Carlos', mat: 6, esp: 7, cie: 6, ing: 5, ef: 7 },
  { id: 4, alumno: 'Martínez García, Ana', mat: 10, esp: 10, cie: 9, ing: 10, ef: 9 },
  { id: 5, alumno: 'González López, Roberto', mat: 7, esp: 6, cie: 7, ing: 7, ef: 8 },
  { id: 6, alumno: 'Díaz Romero, Sofía', mat: 8, esp: 9, cie: 7, ing: 8, ef: 9 },
];

export const transacciones = [
  { id: 1, fecha: '22/05/2026', alumno: 'González, María', concepto: 'Cuota Mayo', monto: 15000, estado: 'pagado', metodo: 'Transferencia' },
  { id: 2, fecha: '21/05/2026', alumno: 'López, Juan', concepto: 'Actividad deportiva', monto: 5000, estado: 'pendiente', metodo: '-' },
  { id: 3, fecha: '20/05/2026', alumno: 'Ruiz, Carlos', concepto: 'Uniforme', monto: 8000, estado: 'pagado', metodo: 'Tarjeta' },
  { id: 4, fecha: '19/05/2026', alumno: 'Martínez, Ana', concepto: 'Cuota Mayo', monto: 15000, estado: 'pagado', metodo: 'Débito' },
  { id: 5, fecha: '18/05/2026', alumno: 'García, Roberto', concepto: 'Libro de texto', monto: 12000, estado: 'pagado', metodo: 'Transferencia' },
  { id: 6, fecha: '17/05/2026', alumno: 'Torres, Sofía', concepto: 'Excursión educativa', monto: 20000, estado: 'pendiente', metodo: '-' },
  { id: 7, fecha: '16/05/2026', alumno: 'Fernández, Pablo', concepto: 'Cuota Mayo', monto: 15000, estado: 'pagado', metodo: 'QR' },
  { id: 8, fecha: '15/05/2026', alumno: 'Sánchez, Laura', concepto: 'Cuota Abril', monto: 15000, estado: 'pagado', metodo: 'Transferencia' },
];

export const usuarios = [
  { id: 1, nombre: 'Juan García', email: 'admin@colegiosanmartin.edu.ar', rol: 'Administrador', ultimoAcceso: 'Hoy 10:30', estado: 'Activo', initials: 'JG', color: 'bg-blue-100 text-blue-700' },
  { id: 2, nombre: 'Prof. Carlos Mendoza', email: 'carlos@colegiosanmartin.edu.ar', rol: 'Docente', ultimoAcceso: 'Ayer 15:45', estado: 'Activo', initials: 'CM', color: 'bg-emerald-100 text-emerald-700' },
  { id: 3, nombre: 'Dra. Ana Rodríguez', email: 'ana@colegiosanmartin.edu.ar', rol: 'Docente', ultimoAcceso: 'Hoy 14:20', estado: 'Activo', initials: 'AR', color: 'bg-emerald-100 text-emerald-700' },
  { id: 4, nombre: 'María González', email: 'maria.gonzalez@mail.com', rol: 'Padre/Madre', ultimoAcceso: 'Hace 2 días', estado: 'Activo', initials: 'MG', color: 'bg-orange-100 text-orange-700' },
  { id: 5, nombre: 'Ing. Roberto Silva', email: 'roberto@colegiosanmartin.edu.ar', rol: 'Docente', ultimoAcceso: 'Ayer 09:00', estado: 'Inactivo', initials: 'RS', color: 'bg-emerald-100 text-emerald-700' },
  { id: 6, nombre: 'Pedro López', email: 'pedro.lopez@mail.com', rol: 'Padre/Madre', ultimoAcceso: 'Hace 3 días', estado: 'Activo', initials: 'PL', color: 'bg-orange-100 text-orange-700' },
  { id: 7, nombre: 'Juan García Ruiz', email: 'juan.garcia@alumnos.edu.ar', rol: 'Alumno', ultimoAcceso: 'Hoy 08:15', estado: 'Activo', initials: 'JG', color: 'bg-violet-100 text-violet-700' },
];

export const actividadReciente = [
  { id: 1, texto: 'Prof. Mendoza cargó las notas de matemática', tiempo: 'Hace 5 min', color: 'bg-blue-500' },
  { id: 2, texto: 'Dirección publicó anuncio "Inicio del trimestre"', tiempo: 'Hace 1 hora', color: 'bg-violet-500' },
  { id: 3, texto: 'Se registraron 5 pagos nuevos de cuota mayo', tiempo: 'Hace 2 horas', color: 'bg-emerald-500' },
  { id: 4, texto: 'Asistencia guardada para 3º Año A (28/32 presentes)', tiempo: 'Hace 3 horas', color: 'bg-orange-500' },
  { id: 5, texto: 'Sistema realizó copia de seguridad automática', tiempo: 'Hace 5 horas', color: 'bg-slate-400' },
];
