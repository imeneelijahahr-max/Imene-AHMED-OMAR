
import React, { useState, useEffect } from 'react';
import { PortfolioData, SectionType, Profile } from '../types';

interface EditModalProps {
  editInfo: { type: SectionType | 'profile' | 'skills_summary'; id?: string };
  data: PortfolioData;
  onClose: () => void;
  onSave: (type: string, item: any) => void;
  onDelete: (type: string, id: string) => void;
  onRefine: (text: string, context: string) => Promise<string>;
}

const EditModal: React.FC<EditModalProps> = ({ editInfo, data, onClose, onSave, onDelete, onRefine }) => {
  const [formData, setFormData] = useState<any>(null);
  const [isRefining, setIsRefining] = useState(false);

  useEffect(() => {
    if (editInfo.type === 'profile') {
      setFormData({ ...data.profile });
    } else if (editInfo.type === 'skills_summary') {
      setFormData({ summary: data.skillsSummary });
    } else {
      const items = data[editInfo.type as SectionType] as any[];
      const item = items.find(i => i.id === editInfo.id);
      if (item) {
        setFormData({ ...item });
      } else {
        // Initialize new item
        const newItem: any = { id: Date.now().toString() };
        if (editInfo.type === SectionType.EXPERIENCE) {
          newItem.title = ''; newItem.organization = ''; newItem.duration = ''; newItem.description = '';
        } else if (editInfo.type === SectionType.CERTIFICATIONS) {
          newItem.title = ''; newItem.issuer = ''; newItem.year = ''; newItem.imageUrl = '';
        } else if (editInfo.type === SectionType.COURSES) {
          newItem.title = ''; newItem.institution = ''; newItem.year = ''; newItem.imageUrl = '';
        } else if (editInfo.type === SectionType.PROJECTS) {
          newItem.title = ''; newItem.description = ''; newItem.technologies = []; newItem.link = '';
        } else if (editInfo.type === SectionType.RESEARCH) {
          newItem.title = ''; newItem.field = ''; newItem.year = ''; newItem.link = '';
        } else if (editInfo.type === SectionType.SKILLS) {
          newItem.name = ''; newItem.category = '';
        }
        setFormData(newItem);
      }
    }
  }, [editInfo, data]);

  if (!formData) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleTechChange = (val: string) => {
    const techs = val.split(',').map(t => t.trim()).filter(t => t);
    handleChange('technologies', techs);
  };

  const handleRefineClick = async (field: string) => {
    setIsRefining(true);
    const refined = await onRefine(formData[field], field);
    handleChange(field, refined);
    setIsRefining(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 animate-in zoom-in-95 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-slate-800 capitalize">
            {editInfo.id ? 'Edit' : 'Add'} {editInfo.type === 'profile' ? 'Profile Info' : editInfo.type.replace('_', ' ')}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6 flex-1">
          {editInfo.type === 'profile' && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Professional Title</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Summary</label>
                  <button 
                    onClick={() => handleRefineClick('summary')}
                    disabled={isRefining}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50"
                  >
                    {isRefining ? 'Refining...' : '✨ Refine with AI'}
                  </button>
                </div>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 h-32"
                  value={formData.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">LinkedIn</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Website</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                />
              </div>
            </>
          )}

          {editInfo.type === 'skills_summary' && (
            <>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Skills Overview Paragraph</label>
                  <button 
                    onClick={() => handleRefineClick('summary')}
                    disabled={isRefining}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50"
                  >
                    {isRefining ? 'Refining...' : '✨ Refine with AI'}
                  </button>
                </div>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-4 text-slate-800 h-64 text-lg leading-relaxed"
                  value={formData.summary}
                  onChange={(e) => handleChange('summary', e.target.value)}
                  placeholder="Write a professional paragraph about your core skills and medical expertise..."
                />
              </div>
            </>
          )}

          {editInfo.type === SectionType.EXPERIENCE && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Duration</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Organization</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Description / Achievements</label>
                  <button 
                    onClick={() => handleRefineClick('description')}
                    disabled={isRefining}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50"
                  >
                    {isRefining ? 'Refining...' : '✨ Refine with AI'}
                  </button>
                </div>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 h-32"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
            </>
          )}

          {editInfo.type === SectionType.CERTIFICATIONS && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Certificate Title</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Issuer</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.issuer}
                    onChange={(e) => handleChange('issuer', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Year</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image</label>
                <input type="file" onChange={handleImageUpload} className="text-sm" accept="image/*" />
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="preview" className="mt-4 h-32 rounded border border-slate-100" />
                )}
              </div>
            </>
          )}

          {editInfo.type === SectionType.COURSES && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Institution</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.institution}
                    onChange={(e) => handleChange('institution', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Year / Date</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Badge/Certificate Image</label>
                <input type="file" onChange={handleImageUpload} className="text-sm" accept="image/*" />
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="preview" className="mt-4 h-32 rounded border border-slate-100" />
                )}
              </div>
            </>
          )}

          {editInfo.type === SectionType.PROJECTS && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800 h-24"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Technologies (comma separated)</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  placeholder="React, Tailwind, Node.js"
                  defaultValue={formData.technologies?.join(', ')}
                  onChange={(e) => handleTechChange(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Project Link</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.link || ''}
                  onChange={(e) => handleChange('link', e.target.value)}
                />
              </div>
            </>
          )}

          {editInfo.type === SectionType.RESEARCH && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Publication/Research Title</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Field</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.field}
                    onChange={(e) => handleChange('field', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Year</label>
                  <input 
                    className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                    value={formData.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Link</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.link || ''}
                  onChange={(e) => handleChange('link', e.target.value)}
                />
              </div>
            </>
          )}

          {editInfo.type === SectionType.SKILLS && (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Skill Name</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g., Surgery, Data Analysis"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <input 
                  className="w-full border border-slate-200 rounded-lg p-3 text-slate-800"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  placeholder="e.g., Clinical, Research, Technical"
                />
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 flex flex-col md:flex-row gap-3 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={() => onSave(editInfo.type, formData)}
            className="flex-1 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Save Changes
          </button>
          {editInfo.id && editInfo.type !== 'profile' && editInfo.type !== 'skills_summary' && (
            <button 
              onClick={() => onDelete(editInfo.type, editInfo.id!)}
              className="px-6 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
            >
              Delete
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-6 bg-white text-slate-500 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
