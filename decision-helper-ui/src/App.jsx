import React, { useState, useEffect } from 'react';
import { ChevronRight, Brain, Users, History, Target, Share2, Clock, Heart, Lightbulb, TrendingUp, CheckCircle, XCircle, MessageCircle, ThumbsUp, ThumbsDown, Calendar, Zap, Trophy, Moon, Sun } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [decision, setDecision] = useState({
    description: '',
    options: '',
    mood: '',
    deadline: '',
    aiAnalysis: null,
    communityVotes: { optionA: 0, optionB: 0, comments: [] }
  });
  const [userDecisions, setUserDecisions] = useState([]);
  const [challengeProgress, setChallengeProgress] = useState(3);

  // Mock AI Analysis Function
  const generateAIAnalysis = (decisionText) => {
    const analyses = {
      'career': {
        pros: ['Better salary potential', 'New learning opportunities', 'Career advancement'],
        cons: ['Higher stress levels', 'Longer commute', 'Leaving comfort zone'],
        recommendation: 'Based on your ambitious nature, taking calculated risks often leads to growth.',
        timeMachine: 'In 6 months, you\'ll likely feel more confident and have expanded your professional network.',
        emotional: 'Your excitement suggests you\'re ready for this challenge. Trust your instincts.'
      },
      'relationship': {
        pros: ['Emotional growth', 'New perspectives', 'Potential happiness'],
        cons: ['Vulnerability', 'Time investment', 'Possible heartbreak'],
        recommendation: 'Authentic connections require courage. Your heart seems to know the answer.',
        timeMachine: 'In 6 months, you\'ll either have a beautiful relationship or valuable lessons learned.',
        emotional: 'Your nervousness is normal - it shows this matters to you.'
      },
      'default': {
        pros: ['Personal growth', 'New experiences', 'Learning opportunity'],
        cons: ['Uncertainty', 'Potential setbacks', 'Energy investment'],
        recommendation: 'Sometimes the best decisions feel scary because they push us to grow.',
        timeMachine: 'In 6 months, you\'ll be proud you considered all angles before deciding.',
        emotional: 'Your thoughtfulness in seeking advice shows wisdom. Trust your process.'
      }
    };

    if (decisionText.toLowerCase().includes('job') || decisionText.toLowerCase().includes('career')) {
      return analyses.career;
    } else if (decisionText.toLowerCase().includes('relationship') || decisionText.toLowerCase().includes('dating')) {
      return analyses.relationship;
    } else {
      return analyses.default;
    }
  };

  const moods = [
    { emoji: '😊', label: 'Optimistic' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '🤔', label: 'Thoughtful' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🔥', label: 'Motivated' },
    { emoji: '😔', label: 'Uncertain' }
  ];

  const HomePage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-blue-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              LifeGPT
            </h1>
          </div>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            Your AI-powered decision companion
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                 onClick={() => setCurrentPage('input')}>
              <Target className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Make Decision</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get AI insights for tough choices</p>
            </div>
            
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                 onClick={() => setCurrentPage('community')}>
              <Users className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Community Vote</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Let others help you decide</p>
            </div>
            
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                 onClick={() => setCurrentPage('dashboard')}>
              <History className="w-8 h-8 text-green-600 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">My Decisions</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track your decision journey</p>
            </div>
            
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                 onClick={() => setCurrentPage('challenge')}>
              <Trophy className="w-8 h-8 text-yellow-600 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">30-Day Challenge</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI-powered decision streak</p>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentPage('input')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
          >
            Start Your Decision Journey <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const DecisionInputPage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">What's on your mind?</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tell me about the decision you're facing</p>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 space-y-6`}>
          <div>
            <label className="block font-semibold mb-3">Describe your decision</label>
            <textarea
              className={`w-full p-4 rounded-xl border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-purple-400 transition-colors resize-none`}
              rows="4"
              placeholder="e.g., Should I take this new job offer that requires relocating?"
              value={decision.description}
              onChange={(e) => setDecision({...decision, description: e.target.value})}
              maxLength="500"
            />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{decision.description.length}/500</p>
          </div>
          
          <div>
            <label className="block font-semibold mb-3">What are your options? (Optional)</label>
            <input
              className={`w-full p-4 rounded-xl border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-purple-400 transition-colors`}
              placeholder="e.g., Take the job vs Stay in current role"
              value={decision.options}
              onChange={(e) => setDecision({...decision, options: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block font-semibold mb-3">How are you feeling right now?</label>
            <div className="grid grid-cols-3 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    decision.mood === mood.label 
                      ? 'border-purple-400 bg-purple-50 dark:bg-purple-900' 
                      : `border-gray-200 ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'hover:bg-gray-50'}`
                  }`}
                  onClick={() => setDecision({...decision, mood: mood.label})}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block font-semibold mb-3">When do you need to decide?</label>
            <input
              type="date"
              className={`w-full p-4 rounded-xl border-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-200'} focus:border-purple-400 transition-colors`}
              value={decision.deadline}
              onChange={(e) => setDecision({...decision, deadline: e.target.value})}
            />
          </div>
          
          <button
            onClick={() => {
              const analysis = generateAIAnalysis(decision.description);
              setDecision({...decision, aiAnalysis: analysis});
              setCurrentPage('analysis');
            }}
            disabled={!decision.description.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            Get AI Analysis <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const AIAnalysisPage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Lightbulb className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">AI Analysis</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>"{decision.description}"</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              <h3 className="text-xl font-bold">Pros</h3>
            </div>
            <ul className="space-y-2">
              {decision.aiAnalysis?.pros.map((pro, index) => (
                <li key={index} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
            <div className="flex items-center mb-4">
              <XCircle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-xl font-bold">Cons</h3>
            </div>
            <ul className="space-y-2">
              {decision.aiAnalysis?.cons.map((con, index) => (
                <li key={index} className={`flex items-start ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-500 mr-2" />
              <h3 className="text-xl font-bold">AI Recommendation</h3>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              {decision.aiAnalysis?.recommendation}
            </p>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-pink-500 mr-2" />
              <h3 className="text-xl font-bold">Emotional Insight</h3>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              {decision.aiAnalysis?.emotional}
            </p>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 mb-8`}>
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-blue-500 mr-2" />
            <h3 className="text-xl font-bold">Time Machine: 6 Months Later</h3>
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
            {decision.aiAnalysis?.timeMachine}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setUserDecisions([...userDecisions, {...decision, status: 'Finalized', date: new Date().toLocaleDateString()}]);
              setCurrentPage('dashboard');
            }}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            That Makes Sense
          </button>
          
          <button
            onClick={() => {
              const randomChoice = Math.random() > 0.5 ? "Go for it!" : "Maybe wait a bit longer";
              alert(`AI Decision: ${randomChoice}`);
            }}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <Zap className="w-5 h-5 mr-2" />
            Let AI Decide for Me
          </button>
          
          <button
            onClick={() => setCurrentPage('community')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Users className="w-5 h-5 mr-2" />
            Get Public Opinion
          </button>
        </div>
      </div>
    </div>
  );

  const CommunityPage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Community Opinion</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Let the community help you decide</p>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-6`}>
          <h3 className="text-xl font-bold mb-4">Anonymous Decision</h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 text-lg`}>
            "{decision.description}"
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button className={`p-4 rounded-xl border-2 ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Option A</span>
                <ThumbsUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500 mt-2">67%</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>142 votes</div>
            </button>
            
            <button className={`p-4 rounded-xl border-2 ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Option B</span>
                <ThumbsDown className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-500 mt-2">33%</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>71 votes</div>
            </button>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Community Comments
            </h4>
            <div className="space-y-3">
              {[
                "I was in a similar situation last year. Taking the risk paid off!",
                "Consider your long-term goals. Sometimes stability is more valuable.",
                "Trust your gut feeling. You usually know the right answer deep down."
              ].map((comment, index) => (
                <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{comment}</p>
                  <p className={`${darkMode ? 'text-gray-500' : 'text-gray-500'} text-xs mt-1`}>Anonymous user • 2h ago</p>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => {
              navigator.share?.({
                title: 'Help me decide!',
                text: decision.description,
                url: window.location.href
              });
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share This Decision
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <History className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">My Decision Journey</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track your progress and reflect on past choices</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 text-center`}>
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-500 mb-1">{userDecisions.length + 12}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Decisions</div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 text-center`}>
            <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-500 mb-1">8</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Followed Through</div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 text-center`}>
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-pink-500 mb-1">85%</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Satisfaction Rate</div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
          <h3 className="text-xl font-bold mb-6">Recent Decisions</h3>
          <div className="space-y-4">
            {[
              {
                description: "Should I learn React or Vue.js for my next project?",
                status: "Finalized",
                date: "2025-07-28",
                reflection: "Chose React - already building amazing projects!"
              },
              {
                description: "Move to a new city for better job opportunities?",
                status: "Pending",
                date: "2025-07-25",
                reflection: ""
              },
              ...userDecisions
            ].map((dec, index) => (
              <div key={index} className={`p-4 rounded-xl border-2 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    dec.status === 'Finalized' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {dec.status}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{dec.date}</span>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{dec.description}</p>
                {dec.reflection && (
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} italic`}>
                    💭 {dec.reflection}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ChallengePage = () => (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-blue-50'} p-4`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">30-Day LifeGPT Challenge</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Use AI to make decisions for 30 days straight!</p>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Your Progress</h3>
            <span className="text-2xl font-bold text-purple-600">{challengeProgress}/30</span>
          </div>
          
          <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-4 mb-6`}>
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(challengeProgress / 30) * 100}%` }}
            ></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold mb-3">Recent Challenge Decisions</h4>
              <div className="space-y-2">
                {[
                  "Day 3: Which coffee shop to work from?",
                  "Day 2: Should I go to the gym or run outside?",
                  "Day 1: What to have for lunch today?"
                ].map((decision, index) => (
                  <div key={index} className={`text-sm p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    {decision}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Challenge Stats</h4>
              <div className="space-y-2">
                <div className={`flex justify-between text-sm p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span>Current Streak</span>
                  <span className="font-semibold text-green-500">{challengeProgress} days</span>
                </div>
                <div className={`flex justify-between text-sm p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span>Best Streak</span>
                  <span className="font-semibold">7 days</span>
                </div>
                <div className={`flex justify-between text-sm p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span>Decisions Made</span>
                  <span className="font-semibold">{challengeProgress}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => {
                setChallengeProgress(prev => Math.min(prev + 1, 30));
                setCurrentPage('input');
              }}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
              disabled={challengeProgress >= 30}
            >
              <Trophy className="w-5 h-5 mr-2" />
              Make Today's Decision
            </button>
            
            {challengeProgress >= 30 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-xl">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">🎉 Challenge Complete!</h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
                  You've successfully used AI to make decisions for 30 days straight!
                </p>
                <button
                  onClick={() => {
                    navigator.share?.({
                      title: 'I completed the 30-Day LifeGPT Challenge!',
                      text: 'I let AI help me make decisions for 30 days straight. Try it yourself!',
                      url: window.location.href
                    });
                  }}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors flex items-center mx-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Achievement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Navigation */}
      {currentPage !== 'home' && (
        <button
          onClick={() => setCurrentPage('home')}
          className={`fixed top-4 left-4 z-50 p-3 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'} shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          ← Home
        </button>
      )}

      {/* Page Router */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'input' && <DecisionInputPage />}
      {currentPage === 'analysis' && <AIAnalysisPage />}
      {currentPage === 'community' && <CommunityPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'challenge' && <ChallengePage />}
    </div>
  );
};

export default App;