
import React, { useState, useEffect, useCallback } from 'react';
import { 
  PortfolioData, 
  SectionType, 
  Experience, 
  Certification, 
  Course, 
  Project, 
  Research, 
  Profile,
  Skill
} from './types';
import { INITIAL_DATA } from './constants';
import { refineText } from './services/geminiService';

// Components
import Header from './components/Header';
import Section from './components/Section';
import AdminControls from './components/AdminControls';
import LoginModal from './components/LoginModal';
import EditModal from './components/EditModal';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeEdit, setActiveEdit] = useState<{ type: SectionType | 'profile' | 'skills_summary'; id?: string } | null>(null);
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('portfolio_pass') || 'usmle');

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
  }, [data]);

  const handleLogin = (password: string) => {
    if (password === adminPassword) {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("Invalid password");
    }
  };

  const updateProfile = (profile: Profile) => {
    setData(prev => ({ ...prev, profile }));
  };

  const updateSection = (type: SectionType, items: any[]) => {
    setData(prev => ({ ...prev, [type]: items }));
  };

  const updateSkillsSummary = (summary: string) => {
    setData(prev => ({ ...prev, skillsSummary: summary }));
  };

  const handleRefine = async (text: string, context: string) => {
    return await refineText(text, context);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white pb-20">
      {/* Portfolio Paper Container */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl print:shadow-none my-0 md:my-8 min-h-screen p-8 md:p-12 portfolio-container">
        
        <Header 
          profile={data.profile} 
          isAdmin={isAdmin} 
          onEdit={() => setActiveEdit({ type: 'profile' })} 
        />

        <div className="grid grid-cols-1 gap-10 mt-12">
          <Section 
            title="Professional Skills & Expertise" 
            type={SectionType.SKILLS}
            items={data.skills} 
            description={data.skillsSummary}
            isAdmin={isAdmin}
            onEdit={(id) => setActiveEdit({ type: SectionType.SKILLS, id })}
            onAdd={() => setActiveEdit({ type: SectionType.SKILLS })}
            onEditDescription={() => setActiveEdit({ type: 'skills_summary' })}
          />

          <Section 
            title="Professional Experience" 
            type={SectionType.EXPERIENCE}
            items={data.experience} 
            isAdmin={isAdmin}
            onEdit={(id) => setActiveEdit({ type: SectionType.EXPERIENCE, id })}
            onAdd={() => setActiveEdit({ type: SectionType.EXPERIENCE })}
          />

          <Section 
            title="Certifications" 
            type={SectionType.CERTIFICATIONS}
            items={data.certifications} 
            isAdmin={isAdmin}
            onEdit={(id) => setActiveEdit({ type: SectionType.CERTIFICATIONS, id })}
            onAdd={() => setActiveEdit({ type: SectionType.CERTIFICATIONS })}
          />

          <Section 
            title="Key Projects" 
            type={SectionType.PROJECTS}
            items={data.projects} 
            isAdmin={isAdmin}
            onEdit={(id) => setActiveEdit({ type: SectionType.PROJECTS, id })}
            onAdd={() => setActiveEdit({ type: SectionType.PROJECTS })}
          />

          <Section 
            title="Completed Courses & Trainings" 
            type={SectionType.COURSES}
            items={data.courses} 
            isAdmin={isAdmin}
            onEdit={(id) => setActiveEdit({ type: SectionType.COURSES, id })}
            onAdd={() => setActiveEdit({ type: SectionType.COURSES })}
          />

          <Section 
            title="Research & Publications" 
            type={SectionType.RESEARCH}
            items={data.research} 
            isAdmin={isAdmin}
            onEdit={(id) => setActiveEdit({ type: SectionType.RESEARCH, id })}
            onAdd={() => setActiveEdit({ type: SectionType.RESEARCH })}
          />
        </div>
      </div>

      {/* Persistence and Admin UI */}
      <AdminControls 
        isAdmin={isAdmin} 
        onLogin={() => setShowLogin(true)}
        onLogout={() => setIsAdmin(false)}
        onPrint={handlePrint}
        onChangePassword={(newPass) => {
          setAdminPassword(newPass);
          localStorage.setItem('portfolio_pass', newPass);
          alert("Password updated successfully!");
        }}
      />

      {showLogin && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}

      {activeEdit && (
        <EditModal 
          editInfo={activeEdit}
          data={data}
          onClose={() => setActiveEdit(null)}
          onSave={(type, updatedItem) => {
            if (type === 'profile') {
              updateProfile(updatedItem as Profile);
            } else if (type === 'skills_summary') {
              updateSkillsSummary(updatedItem.summary);
            } else {
              const currentItems = [...(data[type as SectionType] as any[])];
              const index = currentItems.findIndex(i => i.id === updatedItem.id);
              if (index >= 0) {
                currentItems[index] = updatedItem;
              } else {
                currentItems.push(updatedItem);
              }
              updateSection(type as SectionType, currentItems);
            }
            setActiveEdit(null);
          }}
          onDelete={(type, id) => {
            if (type !== 'profile' && type !== 'skills_summary') {
              const currentItems = [...(data[type as SectionType] as any[])].filter(i => i.id !== id);
              updateSection(type as SectionType, currentItems);
            }
            setActiveEdit(null);
          }}
          onRefine={handleRefine}
        />
      )}
    </div>
  );
};

export default App;
