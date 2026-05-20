const KPICard = ({ titulo, valor, detalle, Icono, colorClass, bordeClass, badge }) => (
  <article className={`rounded-[1.75rem] border ${bordeClass || 'border-slate-200'} bg-white p-6 shadow-[0_20px_55px_-35px_rgba(15,23,42,0.35)]`}>
    <div className="flex items-start justify-between">
      <div className={`rounded-2xl p-3 ${colorClass || 'bg-slate-100 text-slate-700'}`}>
        {Icono && <Icono size={22} />}
      </div>
      {badge && (
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {badge}
        </span>
      )}
    </div>
    <p className="mt-6 text-sm font-medium text-slate-500">{titulo}</p>
    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{valor}</h2>
    {detalle && <p className="mt-2 text-sm text-slate-500">{detalle}</p>}
  </article>
);
export default KPICard;
