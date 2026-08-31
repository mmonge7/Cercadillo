import { useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { BarChart3, Calendar, Eye, TrendingUp, X, Activity, Award } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

interface DayStat {
  dateStr: string; // YYYY-MM-DD
  dayNum: number;
  dayName: string;
  count: number;
  isToday: boolean;
}

const STORAGE_KEY = 'moriscos_real_daily_stats_v2';
const LAUNCH_DATE = '2026-08-31'; // Fecha de lanzamiento de la web

export function VisitorStatsModalInner() {
  const [open, setOpen] = useState(false);
  const [totalVisits, setTotalVisits] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<DayStat | null>(null);
  const [activeTab, setActiveTab] = useState<'chart' | 'calendar'>('chart');
  const [dailyStats, setDailyStats] = useState<DayStat[]>([]);

  useEffect(() => {
    const today = new Date();
    const todayKey = today.toISOString().split('T')[0];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    // 1. Leer estadísticas reales almacenadas
    let storedData: Record<string, number> = {};
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) storedData = JSON.parse(item);
    } catch {}

    // 2. Si es una nueva visita/sesión, incrementar el contador real de hoy
    const sessionKey = `moriscos_session_${todayKey}`;
    const isNewSession = !sessionStorage.getItem(sessionKey);
    if (isNewSession) {
      storedData[todayKey] = (storedData[todayKey] || 0) + 1;
      sessionStorage.setItem(sessionKey, '1');
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
      } catch {}
    } else if (storedData[todayKey] === undefined) {
      storedData[todayKey] = 1;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
      } catch {}
    }

    // 3. Generar los últimos 30 días con datos reales (días anteriores al lanzamiento = 0)
    const stats: DayStat[] = [];
    let localTotal = 0;

    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isToday = i === 0;

      // Solo registrar visitas reales para fechas desde el lanzamiento
      const count = dateStr >= LAUNCH_DATE ? (storedData[dateStr] || 0) : 0;
      localTotal += count;

      stats.push({
        dateStr,
        dayNum: d.getDate(),
        dayName: dayNames[d.getDay()],
        count,
        isToday,
      });
    }

    setDailyStats(stats);
    setSelectedDay(stats[stats.length - 1]);
    setTotalVisits(Math.max(1, localTotal));

    // 4. Sincronizar con API de contador global real
    const apiEndpoint = isNewSession
      ? 'https://api.counterapi.dev/v1/pcresp0-moriscos-wiki/visits/up'
      : 'https://api.counterapi.dev/v1/pcresp0-moriscos-wiki/visits';

    fetch(apiEndpoint)
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data.count === 'number' && data.count > 0) {
          setTotalVisits(data.count);
          // Si el total de la API es mayor, actualizamos el recuento de hoy
          if (data.count > localTotal) {
            storedData[todayKey] = (storedData[todayKey] || 0) + (data.count - localTotal);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
            } catch {}
          }
        }
      })
      .catch(() => {
        // En local/offline se mantiene el contador real del dispositivo
      });
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  const metrics = useMemo(() => {
    if (!dailyStats.length) return { monthTotal: 0, avg: 0, peak: 0, peakDate: '' };
    const monthTotal = dailyStats.reduce((acc, s) => acc + s.count, 0);
    const activeDays = dailyStats.filter((s) => s.count > 0).length || 1;
    const avg = Math.max(1, Math.round(monthTotal / activeDays));
    let peak = 0;
    let peakDate = '';
    dailyStats.forEach((s) => {
      if (s.count >= peak) {
        peak = s.count;
        peakDate = `${s.dayNum} ${s.dayName}`;
      }
    });
    return { monthTotal, avg, peak, peakDate };
  }, [dailyStats]);

  const maxCount = useMemo(() => {
    return Math.max(...dailyStats.map((s) => s.count), 1);
  }, [dailyStats]);

  return (
    <>
      {/* Botón interactivo: número entero exacto */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver estadísticas de visitas (${formatNumber(totalVisits)} visitas)`}
        className="group inline-flex items-center gap-2.5 rounded-xl border border-noche-border bg-noche-surface/90 px-4 py-2 text-sm font-semibold text-pergamino shadow-sm transition-all hover:border-piedra-400 hover:bg-noche-surface hover:shadow-md focus:outline-none focus:ring-2 focus:ring-piedra-400 focus:ring-offset-2 focus:ring-offset-noche"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-piedra-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-piedra-500"></span>
        </span>
        <span className="font-mono text-base font-bold text-piedra-200">
          {formatNumber(totalVisits)}
        </span>
        <span className="text-pergamino-muted/80 text-xs tracking-wide uppercase">visitas</span>
        <BarChart3 size={15} className="text-piedra-300 transition-transform group-hover:scale-110" />
      </button>

      {/* Modal con métricas reales */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-noche/75 backdrop-blur-sm transition-opacity animate-in fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-noche-border bg-noche-surface p-6 shadow-2xl outline-none transition-all duration-200 animate-in fade-in zoom-in-95">
            {/* Cabecera */}
            <div className="flex items-start justify-between border-b border-noche-border pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-piedra-500/20 text-piedra-300 ring-1 ring-piedra-400/30">
                  <Eye size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <Dialog.Title className="font-serif text-xl font-bold text-pergamino">
                    Estadísticas Reales de Visitas
                  </Dialog.Title>
                  <Dialog.Description className="text-xs text-pergamino-muted/70">
                    Registro de afluencia diaria iniciado con el lanzamiento de la web
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close
                aria-label="Cerrar estadísticas"
                className="rounded-lg p-1.5 text-pergamino-muted/70 hover:bg-noche hover:text-pergamino"
              >
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Métricas */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-noche-border bg-noche/60 p-3">
                <div className="flex items-center justify-between text-xs text-pergamino-muted/70">
                  <span>Total acumulado</span>
                  <Award size={14} className="text-piedra-400" />
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-piedra-200">
                  {formatNumber(totalVisits)}
                </div>
                <div className="text-[11px] text-pergamino-muted/50">visitas registradas</div>
              </div>

              <div className="rounded-xl border border-noche-border bg-noche/60 p-3">
                <div className="flex items-center justify-between text-xs text-pergamino-muted/70">
                  <span>Visitas de hoy</span>
                  <Activity size={14} className="text-soto-light" />
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-pergamino">
                  {formatNumber(dailyStats[dailyStats.length - 1]?.count || totalVisits)}
                </div>
                <div className="text-[11px] text-pergamino-muted/50">sesiones hoy</div>
              </div>

              <div className="rounded-xl border border-noche-border bg-noche/60 p-3">
                <div className="flex items-center justify-between text-xs text-pergamino-muted/70">
                  <span>Media diaria</span>
                  <TrendingUp size={14} className="text-piedra-300" />
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-pergamino">
                  ~{metrics.avg}
                </div>
                <div className="text-[11px] text-pergamino-muted/50">visitas / día activo</div>
              </div>

              <div className="rounded-xl border border-noche-border bg-noche/60 p-3">
                <div className="flex items-center justify-between text-xs text-pergamino-muted/70">
                  <span>Pico registrado</span>
                  <BarChart3 size={14} className="text-armuna-light" />
                </div>
                <div className="mt-1 font-mono text-xl font-bold text-armuna-light">
                  {metrics.peak}
                </div>
                <div className="text-[11px] text-pergamino-muted/50 truncate">día {metrics.peakDate}</div>
              </div>
            </div>

            {/* Selector de vistas */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex rounded-lg bg-noche p-1 border border-noche-border">
                <button
                  type="button"
                  onClick={() => setActiveTab('chart')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === 'chart'
                      ? 'bg-piedra-500 text-noche shadow-sm font-bold'
                      : 'text-pergamino-muted hover:text-pergamino'
                  }`}
                >
                  <BarChart3 size={14} />
                  Gráfico 30 Días
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('calendar')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeTab === 'calendar'
                      ? 'bg-piedra-500 text-noche shadow-sm font-bold'
                      : 'text-pergamino-muted hover:text-pergamino'
                  }`}
                >
                  <Calendar size={14} />
                  Calendario Diario
                </button>
              </div>

              {selectedDay && (
                <div className="text-right text-xs">
                  <span className="text-pergamino-muted/70">{selectedDay.dateStr}: </span>
                  <span className="font-mono font-bold text-piedra-200">{selectedDay.count} visitas</span>
                  {selectedDay.isToday && (
                    <span className="ml-1.5 rounded bg-piedra-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-piedra-300">
                      Hoy
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Vista 1: Gráfico de barras */}
            {activeTab === 'chart' && (
              <div className="mt-4 rounded-xl border border-noche-border bg-noche/40 p-4">
                <div className="flex h-44 items-end gap-1 sm:gap-1.5">
                  {dailyStats.map((stat, idx) => {
                    const heightPercent = stat.count > 0 ? Math.max(12, Math.round((stat.count / maxCount) * 100)) : 4;
                    const isSelected = selectedDay?.dateStr === stat.dateStr;
                    return (
                      <button
                        key={stat.dateStr}
                        type="button"
                        onClick={() => setSelectedDay(stat)}
                        onMouseEnter={() => setSelectedDay(stat)}
                        className="group relative flex flex-1 flex-col items-center h-full justify-end focus:outline-none"
                      >
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-sm transition-all ${
                            stat.isToday
                              ? 'bg-gradient-to-t from-piedra-500 to-piedra-300 ring-1 ring-piedra-200'
                              : stat.count > 0
                              ? isSelected
                                ? 'bg-piedra-400 ring-1 ring-pergamino'
                                : 'bg-piedra-700/80 hover:bg-piedra-500/80'
                              : 'bg-noche-border/40 hover:bg-noche-border'
                          }`}
                        />
                        {idx % 5 === 0 && (
                          <span className="mt-2 text-[10px] text-pergamino-muted/50">
                            {stat.dayNum}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-pergamino-muted/50 border-t border-noche-border/60 pt-2">
                  <span>Hace 30 días</span>
                  <span className="italic">Registro real diario desde el lanzamiento de la web</span>
                  <span>Hoy</span>
                </div>
              </div>
            )}

            {/* Vista 2: Calendario mensual */}
            {activeTab === 'calendar' && (
              <div className="mt-4 rounded-xl border border-noche-border bg-noche/40 p-4">
                <div className="grid grid-cols-7 gap-2">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d) => (
                    <div key={d} className="text-center text-xs font-semibold text-pergamino-muted/60">
                      {d}
                    </div>
                  ))}
                  {dailyStats.map((stat) => {
                    const hasVisits = stat.count > 0;
                    const intensity = hasVisits ? stat.count / maxCount : 0;
                    const isSelected = selectedDay?.dateStr === stat.dateStr;
                    return (
                      <button
                        key={stat.dateStr}
                        type="button"
                        onClick={() => setSelectedDay(stat)}
                        className={`flex flex-col items-center justify-center rounded-lg p-2 transition-all ${
                          isSelected
                            ? 'ring-2 ring-piedra-300 bg-noche shadow-md'
                            : 'hover:bg-noche/80'
                        } ${
                          stat.isToday ? 'border border-piedra-400' : 'border border-transparent'
                        }`}
                        style={{
                          backgroundColor: hasVisits
                            ? `rgba(184, 132, 50, ${Math.max(0.2, intensity * 0.6)})`
                            : 'rgba(255, 255, 255, 0.02)',
                        }}
                      >
                        <span className={`text-xs font-semibold ${stat.isToday ? 'text-piedra-300 font-bold' : hasVisits ? 'text-pergamino' : 'text-pergamino-muted/40'}`}>
                          {stat.dayNum}
                        </span>
                        <span className={`mt-0.5 font-mono text-[10px] ${hasVisits ? 'text-piedra-200' : 'text-pergamino-muted/30'}`}>
                          {stat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-pergamino-muted/60 border-t border-noche-border/60 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span>Sin visitas</span>
                    <span className="h-2.5 w-2.5 rounded bg-noche-border/40 inline-block"></span>
                    <span className="h-2.5 w-2.5 rounded bg-piedra-700 inline-block"></span>
                    <span className="h-2.5 w-2.5 rounded bg-piedra-400 inline-block"></span>
                    <span>Con visitas</span>
                  </div>
                  <span className="text-piedra-300 font-medium">Lanzamiento: 31 Ago 2026</span>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default function VisitorStatsModal() {
  return (
    <ErrorBoundary fallback={null}>
      <VisitorStatsModalInner />
    </ErrorBoundary>
  );
}
