import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MessageSquare, Image, LogOut, Plus, Edit, Trash2, Eye, Save, X } from 'lucide-react';

interface Career {
  _id: string;
  role: string;
  dept: string;
  type: string;
  location: string;
  description: string;
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  text: string;
  published: boolean;
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  color: string;
}

interface CareerFormProps {
  career?: Career;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

function CareerForm({ career, onSubmit, onCancel }: CareerFormProps) {
  const [formData, setFormData] = useState({
    role: career?.role || '',
    dept: career?.dept || '',
    type: career?.type || 'Full-time',
    location: career?.location || '',
    description: career?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">{career ? 'Edit Career' : 'Add New Career'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="bg-black border border-white/20 rounded px-3 py-2 text-white text-sm md:text-base"
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.dept}
            onChange={(e) => setFormData({...formData, dept: e.target.value})}
            className="bg-black border border-white/20 rounded px-3 py-2 text-white text-sm md:text-base"
            required
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="bg-black border border-white/20 rounded px-3 py-2 text-white text-sm md:text-base"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="bg-black border border-white/20 rounded px-3 py-2 text-white text-sm md:text-base"
            required
          />
        </div>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white h-20 md:h-24 text-sm md:text-base"
          required
        />
        <div className="flex gap-2 flex-col sm:flex-row">
          <button type="submit" className="bg-green-500 px-4 py-2 rounded hover:bg-green-400 flex-1 sm:flex-none">
            <Save size={16} className="inline mr-2" />
            {career ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-400 flex-1 sm:flex-none">
            <X size={16} className="inline mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

interface TeamFormProps {
  teamMember?: TeamMember;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

function TeamForm({ teamMember, onSubmit, onCancel }: TeamFormProps) {
  const [formData, setFormData] = useState({
    name: teamMember?.name || '',
    role: teamMember?.role || '',
    color: teamMember?.color || '#FFD700',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white/10 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">{teamMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="bg-black border border-white/20 rounded px-3 py-2 text-white text-sm md:text-base"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="bg-black border border-white/20 rounded px-3 py-2 text-white text-sm md:text-base"
            required
          />
          <input
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
            className="bg-black border border-white/20 rounded px-3 py-2 h-10"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
            className="bg-black border border-white/20 rounded px-3 py-2 text-white text-sm md:text-base file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-yellow-500 file:text-black"
            required={!teamMember}
          />
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <button type="submit" className="bg-green-500 px-4 py-2 rounded hover:bg-green-400 flex-1 sm:flex-none">
            <Save size={16} className="inline mr-2" />
            {teamMember ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-400 flex-1 sm:flex-none">
            <X size={16} className="inline mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('careers');
  const [careers, setCareers] = useState<Career[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [showAddTeamForm, setShowAddTeamForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      if (activeTab === 'careers') {
        const res = await fetch(`${baseURL}/careers`);
        const data = await res.json();
        setCareers(data);
      } else if (activeTab === 'reviews') {
        const res = await fetch(`${baseURL}/reviews/unpublished`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setReviews(data);
      } else if (activeTab === 'team') {
        const res = await fetch(`${baseURL}/about/team`);
        const data = await res.json();
        setTeam(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const publishReview = async (id: string) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${baseURL}/reviews/${id}/publish`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const deleteCareer = async (id: string) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${baseURL}/careers/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  const addCareer = async (careerData: Omit<Career, '_id'>) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${baseURL}/careers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(careerData)
    });
    setShowAddForm(false);
    fetchData();
  };

  const updateCareer = async (id: string, careerData: Partial<Career>) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${baseURL}/careers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(careerData)
    });
    setEditingCareer(null);
    fetchData();
  };

  const addTeamMember = async (memberData: any) => {
    const formData = new FormData();
    formData.append('name', memberData.name);
    formData.append('role', memberData.role);
    formData.append('color', memberData.color);
    if (memberData.image) formData.append('image', memberData.image);

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${baseURL}/about/team`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    setShowAddTeamForm(false);
    fetchData();
  };

  const updateTeamMember = async (id: string, memberData: any) => {
    const formData = new FormData();
    if (memberData.name) formData.append('name', memberData.name);
    if (memberData.role) formData.append('role', memberData.role);
    if (memberData.color) formData.append('color', memberData.color);
    if (memberData.image) formData.append('image', memberData.image);

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${baseURL}/about/team/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    setEditingTeamMember(null);
    fetchData();
  };

  const deleteTeamMember = async (id: string) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await fetch(`${baseURL}/about/team/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 p-4 flex justify-between items-center">
        <h2 className="font-['Anton'] text-xl">ADMIN</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white p-2"
        >
          <div className="w-6 h-6 flex flex-col justify-center">
            <span className={`block h-0.5 w-6 bg-white transition-transform ${sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-opacity ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-transform ${sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </div>
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 bg-gray-900 min-h-screen p-6 fixed md:relative z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="hidden md:block">
            <h2 className="font-['Anton'] text-2xl mb-8">ADMIN</h2>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('careers');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${activeTab === 'careers' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'}`}
            >
              <Briefcase size={20} />
              Careers
            </button>
            <button
              onClick={() => {
                setActiveTab('reviews');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${activeTab === 'reviews' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'}`}
            >
              <MessageSquare size={20} />
              Reviews
            </button>
            <button
              onClick={() => {
                setActiveTab('team');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${activeTab === 'team' ? 'bg-yellow-500 text-black' : 'hover:bg-white/10'}`}
            >
              <Image size={20} />
              Team
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="w-full mt-8 px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-red-500/20 text-red-400"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {activeTab === 'careers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-['Anton'] text-3xl">Careers Management</h1>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-400"
                >
                  <Plus size={20} />
                  Add Career
                </button>
              </div>

              {showAddForm && <CareerForm onSubmit={addCareer} onCancel={() => setShowAddForm(false)} />}

              {editingCareer && (
                <CareerForm
                  career={editingCareer}
                  onSubmit={(data) => updateCareer(editingCareer._id, data)}
                  onCancel={() => setEditingCareer(null)}
                />
              )}

              {loading ? <p>Loading...</p> : (
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                  {careers.map(career => (
                    <div key={career._id} className="bg-white/5 p-4 md:p-6 rounded-lg">
                      <h3 className="font-bold text-lg md:text-xl">{career.role}</h3>
                      <p className="text-gray-400 text-sm md:text-base">{career.dept} • {career.location} • {career.type}</p>
                      <p className="mt-2 text-sm md:text-base">{career.description}</p>
                      <div className="mt-4 flex gap-2 flex-wrap">
                        <button
                          onClick={() => setEditingCareer(career)}
                          className="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-400 flex-1 md:flex-none"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCareer(career._id)}
                          className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-400 flex-1 md:flex-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h1 className="font-['Anton'] text-3xl mb-6">Review Management</h1>
              {loading ? <p>Loading...</p> : (
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                  {reviews.map(review => (
                    <div key={review._id} className="bg-white/5 p-4 md:p-6 rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{review.name}</h3>
                          <p className="text-yellow-400 text-sm">Rating: {review.rating}/100</p>
                          <p className="mt-2 text-sm md:text-base">{review.text}</p>
                        </div>
                        <button
                          onClick={() => publishReview(review._id)}
                          className="bg-green-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-400 w-full md:w-auto"
                        >
                          <Eye size={16} />
                          Publish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="font-['Anton'] text-3xl">Team Management</h1>
                <button
                  onClick={() => setShowAddTeamForm(true)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-400"
                >
                  <Plus size={20} />
                  Add Team Member
                </button>
              </div>

              {showAddTeamForm && <TeamForm onSubmit={addTeamMember} onCancel={() => setShowAddTeamForm(false)} />}

              {editingTeamMember && (
                <TeamForm
                  teamMember={editingTeamMember}
                  onSubmit={(data) => updateTeamMember(editingTeamMember._id, data)}
                  onCancel={() => setEditingTeamMember(null)}
                />
              )}

              {loading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {team.map(member => (
                    <div key={member._id} className="bg-white/5 p-4 rounded-lg">
                      <img src={member.image} alt={member.name} className="w-full h-24 md:h-32 object-cover rounded-lg mb-2" />
                      <h3 className="font-bold text-sm md:text-base">{member.name}</h3>
                      <p className="text-gray-400 text-xs md:text-sm">{member.role}</p>
                      <div className="mt-2 flex gap-2 flex-wrap">
                        <button
                          onClick={() => setEditingTeamMember(member)}
                          className="bg-blue-500 px-2 py-1 rounded text-xs hover:bg-blue-400 flex-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTeamMember(member._id)}
                          className="bg-red-500 px-2 py-1 rounded text-xs hover:bg-red-400 flex-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}