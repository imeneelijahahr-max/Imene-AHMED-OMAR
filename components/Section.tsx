
import React from 'react';
import { SectionType, Skill } from '../types';

interface SectionProps {
  title: string;
  type: SectionType;
  items: any[];
  isAdmin: boolean;
  onEdit: (id: string) => void;
  onAdd: () => void;
  description?: string;
  onEditDescription?: () => void;
}

const Section: React.FC<SectionProps> = ({ 
  title, 
  type, 
  items, 
  isAdmin, 
  onEdit, 
  onAdd, 
  description, 
  onEditDescription 
}) => {
  // For skills, group by category
  const groupedSkills = type === SectionType.SKILLS 
    ? items.reduce((acc: { [key: string]: Skill[] }, skill: Skill) => {
        const cat = skill.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(skill);
        return acc;
      }, {})
    : null;

  return (
    <section className="print-break-inside-avoid">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-2">
        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-widest">{title}</h2>
        <div className="flex items-center gap-4 no-print">
          {isAdmin && onEditDescription && (
            <button 
              onClick={onEditDescription}
              className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Edit Summary
            </button>
          )}
          {isAdmin && (
            <button 
              onClick={onAdd}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Add Entry
            </button>
          )}
        </div>
      </div>

      {description && (
        <div className="mb-8 text-slate-700 text-lg leading-relaxed whitespace-pre-wrap max-w-4xl">
          {description}
        </div>
      )}

      {type === SectionType.SKILLS ? (
        <div className="space-y-6">
          {groupedSkills && Object.keys(groupedSkills).map(category => (
            <div key={category}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {groupedSkills[category].map((skill) => (
                  <div key={skill.id} className="relative group">
                    <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200 transition-colors hover:border-blue-300 hover:bg-white flex items-center gap-2">
                      {skill.name}
                      {isAdmin && (
                        <button 
                          onClick={() => onEdit(skill.id)}
                          className="no-print p-1 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-all"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={type === SectionType.EXPERIENCE || type === SectionType.RESEARCH ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
          {items.map((item) => (
            <div key={item.id} className="relative group p-4 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
              {isAdmin && (
                <button 
                  onClick={() => onEdit(item.id)}
                  className="no-print absolute top-2 right-2 p-2 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
              )}

              {type === SectionType.EXPERIENCE && (
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                    <span className="text-sm text-slate-500 font-medium">{item.duration}</span>
                  </div>
                  <p className="text-blue-600 font-medium text-sm mb-3">{item.organization}</p>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{item.description}</p>
                </div>
              )}

              {type === SectionType.CERTIFICATIONS && (
                <div className="flex gap-4 items-start">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded shadow-sm border border-slate-200 bg-white" 
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{item.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{item.issuer}</p>
                    <p className="text-blue-600 text-xs font-semibold mt-1">{item.year}</p>
                  </div>
                </div>
              )}

              {type === SectionType.COURSES && (
                <div className="flex gap-4 items-start">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-16 h-16 object-cover rounded shadow-sm border border-slate-200 bg-white" 
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{item.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{item.institution}</p>
                    <p className="text-slate-400 text-xs mt-1">{item.year}</p>
                  </div>
                </div>
              )}

              {type === SectionType.PROJECTS && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech: string) => (
                      <span key={tech} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:text-blue-600 text-xs font-bold flex items-center gap-1"
                    >
                      View Project
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  )}
                </div>
              )}

              {type === SectionType.RESEARCH && (
                <div className="border-l-2 border-slate-100 pl-4">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    {item.field} • <span className="font-medium text-slate-800">{item.year}</span>
                  </p>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2 inline-flex items-center gap-1"
                    >
                      Publication Link
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-slate-400 italic text-sm">No entries yet.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Section;
