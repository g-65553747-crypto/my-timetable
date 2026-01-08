import React, { useState, useEffect } from 'react';
import { Settings, Calendar, Plus, Trash2, Clock, Check, X, Palette, ChevronLeft, BarChart3, TrendingUp } from 'lucide-react';

// --- CONSTANTS ---
const COLORS = [
  { name: 'Slate', bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-700' },
  { name: 'Gray', bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-700' },
  { name: 'Zinc', bg: 'bg-zinc-100', border: 'border-zinc-200', text: 'text-zinc-700' },
  { name: 'Red', bg: 'bg-red-100', border: 'border-red-200', text: 'text-red-700' },
  { name: 'Orange', bg: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-700' },
  { name: 'Amber', bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-700' },
  { name: 'Yellow', bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700' },
  { name: 'Lime', bg: 'bg-lime-100', border: 'border-lime-200', text: 'text-lime-700' },
  { name: 'Green', bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-700' },
  { name: 'Emerald', bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-700' },
  { name: 'Teal', bg: 'bg-teal-100', border: 'border-teal-200', text: 'text-teal-700' },
  { name: 'Cyan', bg: 'bg-cyan-100', border: 'border-cyan-200', text: 'text-cyan-700' },
  { name: 'Sky', bg: 'bg-sky-100', border: 'border-sky-200', text: 'text-sky-700' },
  { name: 'Blue', bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-700' },
  { name: 'Indigo', bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-700' },
  { name: 'Violet', bg: 'bg-violet-100', border: 'border-violet-200', text: 'text-violet-700' },
  { name: 'Purple', bg: 'bg-purple-100', border: 'border-purple-200', text: 'text-purple-700' },
  { name: 'Fuchsia', bg: 'bg-fuchsia-100', border: 'border-fuchsia-200', text: 'text-fuchsia-700' },
  { name: 'Pink', bg: 'bg-pink-100', border: 'border-pink-200', text: 'text-pink-700' },
  { name: 'Rose', bg: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-700' },
];

const AVAILABLE_SUBJECTS = ['MT', 'BM'];
const AVAILABLE_CLASSES = ['2H', '4H', '5H'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const START_TIME = "07:40";
const SCHOOL_END = "13:10";

// --- SUB-COMPONENTS ---

const ViewPage = ({ timetableData, onNavigate, timeSlots, stats }) => (
  <div className="p-4 md:p-8 max-w-[100vw] mx-auto pb-32">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 px-4">
      <div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">My Schedule</h1>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 w-fit shadow-sm">
          <Clock size={18} className="text-indigo-500" />
          <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">{START_TIME} — {SCHOOL_END}</span>
        </div>
      </div>
      <button 
        onClick={() => onNavigate('manage')}
        className="group relative bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl hover:bg-slate-800 transition-all active:scale-95 overflow-hidden"
      >
        <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
        <span className="font-black text-lg">Edit Timetable</span>
      </button>
    </div>

    {/* Stats Summary Section */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 mb-8">
      <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-200">
        <div className="flex items-center gap-3 mb-2 opacity-80">
          <BarChart3 size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Total Periods</span>
        </div>
        <div className="text-5xl font-black tracking-tight">{stats.totalPeriods}</div>
        <div className="text-xs font-medium text-slate-400 mt-2">periods per week</div>
      </div>

      {AVAILABLE_CLASSES.map((cls, idx) => (
        <div key={cls} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-200 transition-colors">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Class Load</span>
              </div>
              <div className="text-3xl font-black text-slate-800">Class {cls}</div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {cls}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900">{stats.classCounts[cls] || 0}</span>
            <span className="text-xs font-bold text-slate-400">periods</span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden mx-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-max">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-6 text-left border-b border-slate-100 w-40 sticky left-0 bg-slate-50 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Day</span>
              </th>
              {timeSlots.map(slot => (
                <th key={slot.id} className={`p-4 text-center border-b border-slate-100 min-w-[160px] ${slot.isRecess ? 'bg-orange-50/30' : ''}`}>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-sm font-black uppercase tracking-wider ${slot.isRecess ? 'text-orange-500' : 'text-slate-800'}`}>{slot.label}</span>
                    <span className={`text-[10px] font-bold ${slot.isRecess ? 'text-orange-300' : 'text-indigo-400'}`}>{slot.start} - {slot.end}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map(day => (
              <tr key={day} className="group hover:bg-slate-50/30 transition-colors">
                <td className="p-6 border-b border-slate-50 sticky left-0 z-20 bg-white group-hover:bg-slate-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                  <div className="font-black text-slate-900 text-sm uppercase tracking-[0.15em]">{day}</div>
                </td>
                {timeSlots.map((slot) => {
                  if (slot.isRecess) {
                    return (
                      <td key={`${day}-recess`} className="p-2 border-b border-slate-50 bg-orange-50/10 text-center relative">
                        <div className="h-full w-full flex items-center justify-center opacity-20">
                          <div className="w-1.5 h-16 rounded-full bg-orange-300"></div>
                        </div>
                      </td>
                    );
                  }
                  const entries = timetableData[`${day}-${slot.id}`] || [];
                  return (
                    <td key={`${day}-${slot.id}`} className="p-3 border-b border-slate-50 align-top">
                      <div className="flex flex-col gap-2 min-h-[100px]">
                        {entries.length > 0 ? (
                          entries.map((entry) => (
                            <div 
                              key={entry.id} 
                              className={`group/item p-3 rounded-xl border ${entry.color || 'bg-slate-100 border-slate-200'} shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5`}
                            >
                              <div className="font-black text-xs text-slate-800 leading-tight mb-1">{entry.subject}</div>
                              <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider bg-white/50 px-1.5 py-0.5 rounded w-fit">
                                {entry.class}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex-grow rounded-xl border-2 border-dashed border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Free</span>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ManagePage = ({ timetableData, onNavigate, timeSlots, onAdd, onUpdate, onRemove }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32 animate-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => onNavigate('view')}
        className="flex items-center gap-2 text-slate-900 font-black text-sm mb-10 hover:-translate-x-1 transition-transform group"
      >
        <ChevronLeft size={20} className="group-hover:text-indigo-500" />
        BACK TO DASHBOARD
      </button>

      <div className="mb-12">
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Configuration</h1>
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject: MT, BM | Classes: 2H, 4H, 5H</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 p-2 bg-slate-100 rounded-[2rem] shadow-inner">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 py-4 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                selectedDay === day 
                  ? 'bg-white text-indigo-600 shadow-xl scale-100' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50/50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {timeSlots.filter(s => !s.isRecess).map((slot) => {
          const entries = timetableData[`${selectedDay}-${slot.id}`] || [];
          return (
            <div key={slot.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-lg">
                    {slot.id}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">{slot.label}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{slot.start} - {slot.end}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onAdd(selectedDay, slot.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95"
                >
                  <Plus size={18} />
                  ADD SUBJECT
                </button>
              </div>

              <div className="p-6 space-y-6">
                {entries.length === 0 ? (
                  <div className="py-12 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                    <p className="text-slate-400 text-sm font-black uppercase tracking-widest opacity-60">Slot Empty</p>
                  </div>
                ) : (
                  entries.map((entry) => (
                    <div key={entry.id} className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/30 flex flex-col gap-6 relative group/card">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Subject</label>
                          <select
                            value={entry.subject}
                            onChange={(e) => onUpdate(selectedDay, slot.id, entry.id, 'subject', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all border-b-4 border-b-slate-200 focus:border-indigo-500 appearance-none"
                          >
                            {AVAILABLE_SUBJECTS.map(s => (
                              <option key={s} value={s}>{s === 'MT' ? 'Mathematics (MT)' : 'Bahasa Melayu (BM)'}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Class</label>
                          <select
                            value={entry.class}
                            onChange={(e) => onUpdate(selectedDay, slot.id, entry.id, 'class', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all border-b-4 border-b-slate-200 focus:border-indigo-500 appearance-none"
                          >
                            {AVAILABLE_CLASSES.map(c => (
                              <option key={c} value={c}>Class {c}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-slate-100">
                        <div className="space-y-3 w-full sm:w-auto">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Visual Color</label>
                          <div className="grid grid-cols-10 gap-2 p-3 bg-white border border-slate-100 rounded-2xl shadow-inner w-fit">
                            {COLORS.map(c => (
                              <button
                                key={c.name}
                                onClick={() => onUpdate(selectedDay, slot.id, entry.id, 'color', c.bg + ' ' + c.border)}
                                className={`w-6 h-6 rounded-lg transition-all hover:scale-125 shadow-sm border ${
                                  (entry.color || '').includes(c.bg) 
                                    ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110 z-10' 
                                    : 'border-transparent'
                                } ${c.bg}`}
                                title={c.name}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => onRemove(selectedDay, slot.id, entry.id)}
                          className="w-full sm:w-auto px-6 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2 group/del"
                        >
                          <Trash2 size={18} className="group-hover/del:scale-110 transition-transform" />
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('view');
  const [timetableData, setTimetableData] = useState(() => {
    const saved = localStorage.getItem('school_timetable_v5');
    return saved ? JSON.parse(saved) : {};
  });

  const PERIODS_COUNT = 10;
  const RECESS_AFTER = 5;

  useEffect(() => {
    localStorage.setItem('school_timetable_v5', JSON.stringify(timetableData));
  }, [timetableData]);

  const formatTime = (totalMinutes) => {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const calculateSlots = () => {
    const slots = [];
    const [startH, startM] = START_TIME.split(':').map(Number);
    const [endH, endM] = SCHOOL_END.split(':').map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    const recessDuration = 30;
    const periodDuration = Math.floor((endTotal - startTotal - recessDuration) / PERIODS_COUNT);

    let currentMinutes = startTotal;
    for (let i = 1; i <= PERIODS_COUNT; i++) {
      const startTime = formatTime(currentMinutes);
      currentMinutes += periodDuration;
      const endTime = formatTime(currentMinutes);
      slots.push({ id: i, label: `P${i}`, start: startTime, end: endTime, isRecess: false });
      if (i === RECESS_AFTER) {
        const rStart = formatTime(currentMinutes);
        currentMinutes += recessDuration;
        const rEnd = formatTime(currentMinutes);
        slots.push({ id: 'recess', label: 'RECESS', start: rStart, end: rEnd, isRecess: true });
      }
    }
    return slots;
  };

  const timeSlots = calculateSlots();

  const handleAddEntry = (day, periodId) => {
    const key = `${day}-${periodId}`;
    const newEntry = {
      id: crypto.randomUUID(),
      subject: AVAILABLE_SUBJECTS[0], 
      class: AVAILABLE_CLASSES[0],   
      color: COLORS[13].bg + ' ' + COLORS[13].border 
    };
    setTimetableData(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), newEntry]
    }));
  };

  const handleUpdateEntry = (day, periodId, entryId, field, value) => {
    const key = `${day}-${periodId}`;
    setTimetableData(prev => ({
      ...prev,
      [key]: prev[key].map(entry => 
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    }));
  };

  const handleRemoveEntry = (day, periodId, entryId) => {
    const key = `${day}-${periodId}`;
    setTimetableData(prev => ({
      ...prev,
      [key]: prev[key].filter(entry => entry.id !== entryId)
    }));
  };

  // Calculate Statistics
  const calculateStats = () => {
    let totalPeriods = 0;
    const classCounts = AVAILABLE_CLASSES.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {});

    Object.values(timetableData).forEach(dayEntries => {
      if (Array.isArray(dayEntries)) {
        dayEntries.forEach(entry => {
          totalPeriods++;
          if (entry.class && classCounts[entry.class] !== undefined) {
            classCounts[entry.class]++;
          }
        });
      }
    });

    return { totalPeriods, classCounts };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Mobile Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-10 py-5 md:hidden z-50 flex gap-16 shadow-2xl">
        <button 
          onClick={() => setCurrentPage('view')}
          className={`flex flex-col items-center gap-2 transition-all ${currentPage === 'view' ? 'text-indigo-400 scale-110' : 'text-slate-500 opacity-60'}`}
        >
          <Calendar size={24} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">View</span>
        </button>
        <button 
          onClick={() => setCurrentPage('manage')}
          className={`flex flex-col items-center gap-2 transition-all ${currentPage === 'manage' ? 'text-indigo-400 scale-110' : 'text-slate-500 opacity-60'}`}
        >
          <Settings size={24} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Setup</span>
        </button>
      </nav>

      {currentPage === 'view' ? (
        <ViewPage 
          timetableData={timetableData} 
          onNavigate={setCurrentPage}
          timeSlots={timeSlots}
          stats={stats}
        />
      ) : (
        <ManagePage 
          timetableData={timetableData} 
          onNavigate={setCurrentPage}
          timeSlots={timeSlots}
          onAdd={handleAddEntry}
          onUpdate={handleUpdateEntry}
          onRemove={handleRemoveEntry}
        />
      )}
    </div>
  );
};

export default App;