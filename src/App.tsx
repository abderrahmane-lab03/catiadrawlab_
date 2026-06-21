/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { 
  Library, 
  Search, 
  Play, 
  Download, 
  ArrowLeft, 
  Clock, 
  FileText, 
  Settings, 
  Youtube,
  Github,
  Monitor,
  Menu,
  X,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DRAWINGS, CATEGORIES } from './data';
import { Drawing, Difficulty } from './types';

export default function App() {
  const [selectedDrawingId, setSelectedDrawingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDrawingId) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedDrawingId]);

  const scrollTo = (elementId: string) => {
    if (selectedDrawingId) {
      setSelectedDrawingId(null);
      // Wait for exit animation (300ms) plus a small buffer before scrolling
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          const yOffset = -120; // Offset for floating nav and padding
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 350);
    } else {
      const el = document.getElementById(elementId);
      if (el) {
        const yOffset = -120;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: 'Home', action: () => { setSelectedDrawingId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { name: 'Library', action: () => scrollTo('drawing-grid-start') },
    { name: 'Categories', action: () => scrollTo('categories-section') }
  ];

  const selectedDrawing = useMemo(() => 
    DRAWINGS.find(d => d.id === selectedDrawingId)
  , [selectedDrawingId]);

  const filteredDrawings = useMemo(() => {
    return DRAWINGS.filter(d => {
      const matchCategory = activeCategory === 'All' || d.category === activeCategory;
      const matchDifficulty = selectedDifficulty === 'All' || d.difficulty === selectedDifficulty;
      const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchDifficulty && matchSearch;
    });
  }, [activeCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen blueprint-bg">
      {/* Dynamic Floating Navigation */}
      <div className="fixed top-6 inset-x-0 z-50 px-4 pointer-events-none">
        <nav className="max-w-3xl mx-auto pointer-events-auto">
          <motion.div 
            className="flex items-center p-1.5 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-full shadow-lg shadow-slate-200/40"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {/* Brand Logo inside Nav */}
            <div 
              className="px-5 py-2.5 cursor-pointer flex items-center gap-2.5 border-r border-slate-200" 
              onClick={() => { setSelectedDrawingId(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Settings className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-black tracking-tighter text-slate-800 uppercase italic">C<span className="text-blue-500">DB</span></span>
            </div>

            {/* Nav Items - Desktop */}
            <div className="hidden md:flex items-center justify-center flex-1 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative px-6 py-3 text-xs font-black uppercase tracking-[0.25em] text-slate-600 hover:text-slate-900 transition-colors duration-300 z-10"
                >
                  {item.name}
                  {hoveredNav === item.name && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-blue-50 border border-blue-100 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex-1 flex items-center justify-end pr-2">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-4 right-4 mt-2 p-2 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-2xl md:hidden overflow-hidden shadow-xl"
              >
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      item.action();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-xl transition-all"
                  >
                    {item.name}
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {!selectedDrawingId ? (
            <motion.div
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <section className="relative pt-20 pb-20 overflow-hidden border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-2xl"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold mb-6">
                      <Monitor className="w-3 h-3" />
                      PROFESSIONAL CAD REFERENCE
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 tracking-tight mb-6">
                      CATIA Technical <br />
                      <span className="text-blue-600">Drawing Library</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                      Practice mechanical modeling with real engineering drawings and step-by-step video tutorials. Professional CAD library for engineers.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="tech-button-primary scale-110"
                      >
                        <Library className="w-5 h-5" />
                        Browse Drawings
                      </button>
                      <button className="tech-button-secondary scale-110">
                        <Play className="w-5 h-5 text-blue-600" />
                        Watch Intro
                      </button>
                    </div>
                  </motion.div>
                </div>
                
                {/* Abstract CAD elements */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
                  <div className="w-[800px] h-[600px] border border-blue-500/10 rounded-full rotate-12 blur-[100px] bg-blue-500/5"></div>
                </div>
              </section>

              {/* Filter & Grid Section */}
              <section id="grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-10 flex justify-center">
                  <button 
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-8 py-3 rounded-full text-sm font-bold text-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-100 uppercase tracking-widest"
                  >
                    <Filter className="w-4 h-4" />
                    {filtersOpen ? 'Hide Filters' : 'Show Filters & Search'}
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Sidebar Filters */}
                  <aside className={`w-full lg:w-64 space-y-10 ${filtersOpen ? 'block animate-in fade-in slide-in-from-top-2 duration-300' : 'hidden lg:block'}`}>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Search</h3>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Search parts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-md py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div id="categories-section">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Categories</h3>
                      <div className="space-y-1">
                        {CATEGORIES.slice(0, 8).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-center justify-between group ${
                              activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                          >
                            {cat}
                            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${activeCategory === cat ? 'opacity-100' : 'opacity-0'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Difficulty</h3>
                      <div className="flex flex-wrap gap-2">
                        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedDifficulty(level as Difficulty | 'All')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                              selectedDifficulty === level 
                                ? 'bg-blue-50 border-blue-500 text-blue-600' 
                                : 'border-slate-200 text-slate-600 bg-white hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </aside>

                  {/* Drawing Grid */}
                  <div className="flex-1" id="drawing-grid-start">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-slate-800">Technical Drawings</h2>
                      <span className="text-sm text-slate-500 font-mono">{filteredDrawings.length} Drawings Found</span>
                    </div>

                    {filteredDrawings.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredDrawings.map((drawing, index) => (
                          <motion.div
                            key={drawing.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ 
                              delay: index * 0.05,
                              y: { duration: 0.2, ease: "easeOut" }
                            }}
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = e.clientX - rect.left;
                              const y = e.clientY - rect.top;
                              e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                              e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                            }}
                            onClick={() => !drawing.isComingSoon && setSelectedDrawingId(drawing.id)}
                            className={`glass-card group h-full flex flex-col relative overflow-hidden ${drawing.isComingSoon ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                          >
                            {/* Interactive Glow Effect */}
                            {!drawing.isComingSoon && (
                              <motion.div 
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                  background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.08), transparent 40%)'
                                }}
                              />
                            )}

                            {drawing.isComingSoon && (
                              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none p-4">
                                <div className="bg-blue-600/90 text-[10px] font-bold text-white px-3 py-1.5 rounded border border-blue-400/50 shadow-xl shadow-blue-900/40 tracking-[0.2em] uppercase backdrop-blur-sm">
                                  Coming Soon
                                </div>
                                <div className="absolute top-0 right-0">
                                  <div className="bg-blue-600 text-[9px] font-black text-white px-8 py-1 rotate-45 translate-x-6 translate-y-2 shadow-lg tracking-widest uppercase">
                                    Locked
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="aspect-[16/10] overflow-hidden relative border-b border-slate-200">
                              <img 
                                src={drawing.image} 
                                alt={drawing.name}
                                referrerPolicy="no-referrer"
                                className={`w-full h-full object-cover grayscale opacity-90 transition-all duration-700 ease-out ${
                                  drawing.isComingSoon 
                                    ? 'blur-lg scale-110 opacity-40' 
                                    : 'group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100'
                                }`}
                              />
                              <div className={`absolute inset-0 transition-opacity pointer-events-none ${drawing.isComingSoon ? 'bg-slate-100/40' : 'bg-blue-600/5 opacity-0 group-hover:opacity-100'}`} />
                              
                              <div className="absolute top-4 left-4 flex gap-2">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase ${
                                  drawing.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border border-green-200' :
                                  drawing.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                  {drawing.difficulty}
                                </span>
                              </div>

                              <div className="absolute bottom-3 left-4">
                                <span className="text-[10px] font-mono text-slate-500 bg-white/90 px-2 py-0.5 rounded border border-slate-200 uppercase tracking-tighter">
                                  REF-{drawing.id.substring(0, 3).toUpperCase()}-{index + 101}
                                </span>
                              </div>

                              {/* Download Buttons - Overlay on Image */}
                              {!drawing.isComingSoon && (
                                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                  <a 
                                    href={drawing.catPartUrl}
                                    onClick={(e) => e.stopPropagation()}
                                    title="Download .CATPart"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full border border-blue-400/30 transition-all shadow-xl shadow-blue-900/40 translate-y-4 group-hover:translate-y-0 duration-300"
                                  >
                                    <Download className="w-3.5 h-3.5" /> CATPart
                                  </a>
                                  <a 
                                    href={drawing.downloadUrl}
                                    onClick={(e) => e.stopPropagation()}
                                    title="Download PDF Blueprint"
                                    className="flex items-center gap-2 text-[10px] font-black uppercase bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-full border border-slate-600 hover:border-slate-500 transition-all shadow-xl translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                                  >
                                    <FileText className="w-3.5 h-3.5" /> PDF
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className={`text-lg font-bold text-slate-800 transition-colors uppercase tracking-tight ${!drawing.isComingSoon && 'group-hover:text-blue-600'}`}>{drawing.name}</h3>
                                <div className="flex items-center gap-1 text-slate-500 text-xs font-mono">
                                  <Clock className="w-3 h-3" />
                                  {drawing.time}
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-snug">{drawing.description}</p>
                              
                              <div className="mt-auto relative pt-4 border-t border-slate-100">
                                {/* Regular tags (visible when not hovered) */}
                                <div className="flex items-center justify-between transition-all duration-300">
                                  <div className="flex flex-wrap gap-1">
                                    {drawing.tools.slice(0, 2).map(tool => (
                                      <span key={tool} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium border border-slate-200">{tool}</span>
                                    ))}
                                  </div>
                                  {!drawing.isComingSoon ? (
                                    <div className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                      Open <ChevronRight className="w-3 h-3" />
                                    </div>
                                  ) : (
                                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                      Locked
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center">
                        <Filter className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-slate-600">No drawings found</h3>
                        <p className="text-slate-500 mt-2">Adjust your filters or try a different search term.</p>
                        <button 
                          onClick={() => { setActiveCategory('All'); setSelectedDifficulty('All'); setSearchQuery(''); }}
                          className="mt-6 text-blue-600 hover:underline text-sm font-medium"
                        >
                          Reset all filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
              <button 
                onClick={() => setSelectedDrawingId(null)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 group transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Library
              </button>

              {selectedDrawing && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Left content: Video and Drawing */}
                  <div className="lg:col-span-2 space-y-6 md:space-y-10">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 rounded bg-blue-50 border border-blue-200 text-blue-600 text-[10px] md:text-xs font-bold tracking-widest uppercase">
                          {selectedDrawing.difficulty}
                        </span>
                        <span className="text-slate-500 text-[10px] md:text-sm font-mono tracking-wider">{selectedDrawing.category.toUpperCase()}</span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase">{selectedDrawing.name}</h1>
                    </div>

                    {/* Tutorial Video */}
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl">
                      <iframe 
                        className="absolute inset-0 w-full h-full"
                        src={selectedDrawing.videoUrl} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* Description & Tools */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          About this exercise
                        </h3>
                        <p className="text-slate-600 leading-relaxed italic">{selectedDrawing.description}</p>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          <Settings className="w-5 h-5 text-blue-600" />
                          Modeling Tools
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedDrawing.tools.map(tool => (
                            <span key={tool} className="bg-white border border-slate-200 px-3 py-1.5 rounded text-sm text-slate-600 font-mono">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Technical Drawing Reference */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Technical Drawing Sheet</h3>
                        <div className="flex gap-4">
                          <a 
                            href={selectedDrawing.downloadUrl}
                            className="tech-button-secondary py-1 text-xs px-3 no-underline inline-flex items-center gap-2"
                          >
                            <Download className="w-3 h-3" />
                            PDF Blueprint
                          </a>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-1 group relative overflow-hidden border border-slate-200">
                        <img 
                          src={selectedDrawing.image} 
                          alt="Blueprint" 
                          referrerPolicy="no-referrer"
                          className="w-full rounded-lg shadow-inner grayscale contrast-125 transition-all group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                           <span className="bg-white/90 px-4 py-2 rounded-full border border-blue-500 text-slate-800 text-sm font-bold">FOCUS VIEW</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar stats & downloads */}
                  <aside className="space-y-8">
                    <div className="glass-card p-6 rounded-xl space-y-6 border-blue-200/60">
                      <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest border-b border-slate-100 pb-4">Technical Specifications</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Estimated Time</div>
                          <div className="text-lg font-bold text-slate-800">{selectedDrawing.time}</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Complexity</div>
                          <div className="text-lg font-bold text-slate-800">{selectedDrawing.difficulty}</div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4">
                        <a 
                          href={selectedDrawing.catPartUrl}
                          className="w-full tech-button-primary scale-100 py-3 text-base no-underline flex items-center justify-center gap-3"
                        >
                          <Download className="w-5 h-5" />
                          Download .CATPart
                        </a>
                        <a 
                          href={selectedDrawing.downloadUrl}
                          className="w-full tech-button-secondary scale-100 py-3 text-base no-underline flex items-center justify-center gap-3"
                        >
                          <FileText className="w-5 h-5" />
                          Download Drawing (PDF)
                        </a>
                      </div>

                      <div className="pt-6 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Related Drawings</h4>
                        <div className="space-y-4">
                          {DRAWINGS.filter(d => d.category === selectedDrawing.category && d.id !== selectedDrawing.id).slice(0, 2).map(d => (
                             <div 
                              key={d.id} 
                              onClick={() => { setSelectedDrawingId(d.id); window.scrollTo(0,0); }}
                              className="flex gap-3 group cursor-pointer"
                             >
                               <div className="w-20 aspect-square rounded overflow-hidden flex-shrink-0 border border-slate-200 bg-white">
                                 <img src={d.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                               </div>
                               <div>
                                 <h5 className="text-sm font-bold text-slate-700 group-hover:text-blue-600 truncate w-32">{d.name}</h5>
                                 <p className="text-[10px] text-slate-500 uppercase mt-1">{d.difficulty}</p>
                               </div>
                             </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-xl block">
                       <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4">Support the Creator</h3>
                       <p className="text-sm text-slate-600 mb-4 leading-relaxed">Enjoying these tutorials? Consider subscribing to our YouTube channel for weekly CAD exercises.</p>
                       <button className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white tech-button-base py-2 transition-colors">
                         <Youtube className="w-5 h-5" />
                         Subscribe 1.2k
                       </button>
                    </div>
                  </aside>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-6 h-6 text-blue-600" />
                <span className="text-2xl font-bold tracking-tighter text-slate-800 uppercase">CATIA<span className="text-blue-500">DB</span></span>
              </div>
              <p className="text-slate-600 max-w-sm mb-8 text-sm leading-relaxed">
                The world's premier technical drawing library for mechanical engineering students and professionals focusing on CATIA V5/V6.
              </p>
              <div className="flex flex-wrap gap-3">
                 {['TikTok', 'YouTube', 'Instagram', 'LinkedIn'].map(social => (
                   <a key={social} href="#" className="px-3 py-2 border border-slate-200 rounded bg-white text-slate-600 hover:text-blue-600 hover:border-blue-400 transition-all text-[10px] font-bold uppercase tracking-wider">{social}</a>
                 ))}
              </div>
            </div>
            <div>
              <h4 className="text-slate-800 font-bold mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                {['Browse Drawings', 'Watch Tutorials', 'Categories', 'Privacy Policy'].map(link => (
                  <li key={link}><a href="#" className="hover:text-blue-600 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-slate-800 font-bold mb-6 uppercase tracking-widest text-xs">Community</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                {['Support Forum', 'Discord Channel', 'Tutorial Requests', 'Share Your Models', 'Newsletter'].map(link => (
                  <li key={link}><a href="#" className="hover:text-blue-600 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-slate-400">&copy; 2026 CATIADB Engineering Library. All rights reserved.</p>
            <p className="text-[10px] text-slate-500 font-mono italic">Professional Technical Reference v4.12.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
