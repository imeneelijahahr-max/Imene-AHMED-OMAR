
import React from 'react';
import { Profile } from '../types';

interface HeaderProps {
  profile: Profile;
  isAdmin: boolean;
  onEdit: () => void;
}

const Header: React.FC<HeaderProps> = ({ profile, isAdmin, onEdit }) => {
  return (
    <header className="relative border-b-2 border-slate-900 pb-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 bg-blue-600 rounded-full print:hidden"></div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{profile.name}</h1>
          </div>
          <p className="text-xl text-blue-700 font-semibold mt-2 uppercase tracking-wide">{profile.title}</p>
          <div className="mt-6 text-slate-700 leading-relaxed max-w-3xl whitespace-pre-wrap text-lg italic border-l-4 border-slate-100 pl-6">
            {profile.summary}
          </div>
        </div>
        
        <div className="flex flex-col gap-3 text-sm text-slate-600 md:text-right shrink-0 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <a href={`mailto:${profile.email}`} className="hover:text-blue-600 flex items-center md:justify-end gap-2 transition-colors font-medium">
            {profile.email}
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </a>
          {profile.phone && (
             <p className="flex items-center md:justify-end gap-2 font-medium">{profile.phone}</p>
          )}
          <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center md:justify-end gap-2 transition-colors font-medium">
            LinkedIn Profile
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center md:justify-end gap-2 transition-colors font-medium">
            Professional Website
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
          </a>
        </div>
      </div>

      {isAdmin && (
        <button 
          onClick={onEdit}
          className="no-print absolute top-0 right-0 p-2 text-blue-500 hover:bg-blue-100 rounded-full transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </button>
      )}
    </header>
  );
};

export default Header;
