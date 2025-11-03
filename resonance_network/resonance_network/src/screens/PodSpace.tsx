import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService, Pod, PodMember, PodMessage } from '../services/apiService';

const PodSpace: React.FC = () => {
  const { podId } = useParams<{ podId: string }>();
  const [pod, setPod] = useState<Pod | null>(null);
  const [members, setMembers] = useState<PodMember[]>([]);
  const [messages, setMessages] = useState<PodMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (podId) {
      loadPodData();
    }
  }, [podId]);

  const loadPodData = async () => {
    if (!podId) return;
    
    try {
      setLoading(true);
      
      // For demo purposes, create sample pod data
      const samplePod: Pod = {
        id: podId,
        name: "Resonance Builders",
        description: "A pod focused on cultivating deep connections and creative expression among members.",
        start_date: "2025-01-01",
        end_date: "2025-02-01",
        status: "active",
        resonance_theme: "Creative Flow & Collaboration",
        cynthia_guidance: "This cycle, focus on sharing your unique talents and actively listening to others' insights to foster synergy."
      };
      setPod(samplePod);

      // Sample members
      const sampleMembers: PodMember[] = [
        {
          id: "member-1",
          pod_id: podId,
          user_id: user?.id || "current-user",
          joined_at: "2025-01-01T10:00:00Z",
          feedback: null
        },
        {
          id: "member-2",
          pod_id: podId,
          user_id: "user-2",
          joined_at: "2025-01-01T11:00:00Z",
          feedback: null
        },
        {
          id: "member-3",
          pod_id: podId,
          user_id: "user-3",
          joined_at: "2025-01-01T12:00:00Z",
          feedback: null
        }
      ];
      setMembers(sampleMembers);

      // Load existing messages
      try {
        const podMessages = await apiService.getPodMessages(podId);
        setMessages(podMessages);
      } catch (error) {
        // If no messages exist, start with sample messages
        const sampleMessages: PodMessage[] = [
          {
            id: "msg-1",
            pod_id: podId,
            user_id: "user-2",
            message: "Welcome everyone! Excited to start this resonance journey together 🌟"
          },
          {
            id: "msg-2",
            pod_id: podId,
            user_id: "user-3",
            message: "Looking forward to exploring our creative synergies!"
          }
        ];
        setMessages(sampleMessages);
      }
      
    } catch (error) {
      console.error('Error loading pod data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !podId) return;
    
    setSendingMessage(true);
    
    try {
      const messageData: PodMessage = {
        pod_id: podId,
        user_id: user.id,
        message: newMessage.trim()
      };
      
      const createdMessage = await apiService.createPodMessage(messageData);
      setMessages(prev => [...prev, createdMessage]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // Add message locally for demo purposes
      const localMessage: PodMessage = {
        id: `local-${Date.now()}`,
        pod_id: podId,
        user_id: user.id,
        message: newMessage.trim()
      };
      setMessages(prev => [...prev, localMessage]);
      setNewMessage('');
    } finally {
      setSendingMessage(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-retro-green';
      case 'forming': return 'text-retro-yellow';
      case 'completed': return 'text-retro-cyan';
      default: return 'text-white';
    }
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-green flex items-center justify-center safe-area-top safe-area-bottom">
        <div className="text-center">
          <i className="fa fa-spinner animate-pixel-spin text-4xl text-retro-cyan mb-4"></i>
          <p className="font-pixel text-white">Loading pod space...</p>
        </div>
      </div>
    );
  }

  if (!pod) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-red flex items-center justify-center safe-area-top safe-area-bottom">
        <div className="text-center">
          <i className="fa fa-exclamation-triangle text-4xl text-retro-red mb-4"></i>
          <p className="font-pixel text-white">Pod not found</p>
          <button
            onClick={() => navigate('/home')}
            className="pixel-button mt-4"
          >
            RETURN HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-dark via-gray-900 to-retro-green safe-area-top safe-area-bottom">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/home')}
            className="mr-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <i className="fa fa-arrow-left text-xl"></i>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-pixel text-white text-shadow-pixel">
              {pod.name}
            </h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`font-pixel ${getStatusColor(pod.status)}`}>
                {pod.status.toUpperCase()}
              </span>
              <span className="text-white/60 font-pixel">
                {getDaysRemaining(pod.end_date)} days left
              </span>
            </div>
          </div>
        </div>

        {/* Pod Info */}
        <div className="pixel-card mb-6 animate-slide-up">
          <div className="flex items-center mb-3">
            <i className="fa fa-circle-info text-retro-cyan text-xl mr-3"></i>
            <h2 className="font-pixel text-white text-lg">POD INFO</h2>
          </div>
          
          <p className="text-white/80 font-pixel text-sm mb-3">
            {pod.description}
          </p>
          
          <div className="bg-retro-cyan/10 border border-retro-cyan p-3 mb-3">
            <h4 className="font-pixel text-retro-cyan text-sm mb-1">RESONANCE THEME</h4>
            <p className="font-pixel text-white text-sm">{pod.resonance_theme}</p>
          </div>
          
          <div className="flex items-center text-white/60 font-pixel text-sm">
            <i className="fa fa-users mr-2"></i>
            {members.length} members
          </div>
        </div>

        {/* Cynthia's Guidance */}
        <div className="pixel-card mb-6 animate-slide-up">
          <div className="flex items-center mb-3">
            <i className="fa fa-robot text-retro-purple text-xl mr-3"></i>
            <h2 className="font-pixel text-white text-lg">CYNTHIA'S GUIDANCE</h2>
          </div>
          
          <div className="bg-retro-purple/10 border border-retro-purple p-3">
            <p className="text-retro-purple font-pixel text-sm">
              {pod.cynthia_guidance}
            </p>
          </div>
        </div>

        {/* Members */}
        <div className="pixel-card mb-6 animate-slide-up">
          <div className="flex items-center mb-3">
            <i className="fa fa-user-group text-retro-green text-xl mr-3"></i>
            <h2 className="font-pixel text-white text-lg">MEMBERS</h2>
          </div>
          
          <div className="space-y-2">
            {members.map((member, index) => (
              <div key={member.id} className="flex items-center p-2 bg-gray-900/50 border border-gray-700">
                <div className="w-8 h-8 bg-retro-green border-2 border-white flex items-center justify-center mr-3">
                  <span className="font-pixel text-white text-xs">
                    {member.user_id === user?.id ? 'YOU' : `M${index + 1}`}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-pixel text-white text-sm">
                    {member.user_id === user?.id ? 'You' : `Member ${index + 1}`}
                  </p>
                  <p className="font-pixel text-white/60 text-xs">
                    Joined {new Date(member.joined_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-3 h-3 bg-retro-green border border-white"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Interface */}
        <div className="pixel-card mb-6 animate-slide-up">
          <div className="flex items-center mb-3">
            <i className="fa fa-comments text-retro-pink text-xl mr-3"></i>
            <h2 className="font-pixel text-white text-lg">GROUP CHAT</h2>
          </div>
          
          {/* Messages */}
          <div className="bg-gray-900/50 border border-gray-700 p-3 h-64 overflow-y-auto mb-3">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-2 border-2 ${
                      message.user_id === user?.id
                        ? 'bg-retro-cyan/20 border-retro-cyan text-retro-cyan'
                        : 'bg-gray-800 border-gray-600 text-white'
                    }`}
                  >
                    <p className="font-pixel text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 pixel-input text-sm"
              placeholder="Type your message..."
              disabled={sendingMessage}
            />
            <button
              type="submit"
              disabled={sendingMessage || !newMessage.trim()}
              className="px-4 py-3 bg-retro-pink border-2 border-white text-white font-pixel text-sm hover:bg-retro-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingMessage ? (
                <i className="fa fa-spinner animate-pixel-spin"></i>
              ) : (
                <i className="fa fa-paper-plane"></i>
              )}
            </button>
          </form>
        </div>

        {/* Shared Dashboard */}
        <div className="pixel-card animate-slide-up">
          <div className="flex items-center mb-3">
            <i className="fa fa-chart-line text-retro-yellow text-xl mr-3"></i>
            <h2 className="font-pixel text-white text-lg">SHARED METRICS</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-pixel text-retro-green mb-1">3.2</div>
              <div className="font-pixel text-white/60 text-xs">AVG RESONANCE</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-pixel text-retro-cyan mb-1">87%</div>
              <div className="font-pixel text-white/60 text-xs">SYNC RATE</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-pixel text-retro-pink mb-1">24</div>
              <div className="font-pixel text-white/60 text-xs">MESSAGES</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-pixel text-retro-yellow mb-1">12</div>
              <div className="font-pixel text-white/60 text-xs">INSIGHTS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodSpace;