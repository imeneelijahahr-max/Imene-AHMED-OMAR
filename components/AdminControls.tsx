
import React, { useState } from 'react';

interface AdminControlsProps {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onPrint: () => void;
  onChangePassword: (newPass: string) => void;
}

const AdminControls: React.FC<AdminControlsProps> = ({ isAdmin, onLogin, onLogout, onPrint, onChangePassword }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [newPass, setNewPass] = useState('');

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 no-print z-50">
      {isAdmin && showSettings && (
        <div className="bg-white p-4 rounded-xl shadow-2xl border border-slate-200 w-64 mb-2 animate-in slide-in-from-bottom-2">
          <h3 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-tighter">Owner Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">New Access Password</label>
              <input 
                type="password" 
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
                className="w-full text-sm border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button 
              onClick={() => {
                if(newPass) {
                  onChangePassword(newPass);
                  setNewPass('');
                  setShowSettings(false);
                }
              }}
              className="w-full text-xs font-bold bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition-colors"
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {isAdmin ? (
          <>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="bg-white text-slate-600 p-3 rounded-full shadow-lg border border-slate-200 hover:bg-slate-50 transition-all"
              title="Settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button 
              onClick={onLogout}
              className="bg-red-500 text-white px-5 py-2.5 rounded-full shadow-lg font-bold text-sm hover:bg-red-600 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Logout
            </button>
          </>
        ) : (
          <button 
            onClick={onLogin}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-lg font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Owner Access
          </button>
        )}
        
        <button 
          onClick={onPrint}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          title="Export PDF"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default AdminControls;
