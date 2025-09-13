import React, { useState, useRef } from 'react';
import { Upload, MessageCircle, Target, Lightbulb, Calculator, Send, FileText } from 'lucide-react';

const CarbonBudget = () => {
  const [file, setFile] = useState(null);
  const [isBudgetMode, setIsBudgetMode] = useState(false); // Default to chat mode
  const [reductionPercent, setReductionPercent] = useState(20);
  const [budgetData, setBudgetData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasActiveSession, setHasActiveSession] = useState(true); // Default chat is always active
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleModeChange = (budgetMode) => {
    setIsBudgetMode(budgetMode);
    if (!budgetMode) {
      // Switching to chat mode - enable chat immediately
      setHasActiveSession(true);
      if (chatMessages.length === 0) {
        setChatMessages([{
          type: 'system',
          content: 'Hi! I\'m your energy efficiency assistant. Ask me anything about saving energy, reducing carbon footprint, or sustainable living practices!'
        }]);
      }
    } else {
      // Switching to budget mode - disable chat until bill is uploaded
      setHasActiveSession(false);
      setChatMessages([]);
      setBudgetData(null);
    }
  };

  const handleSubmitBill = async () => {
    if (!file) return;
    
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', 'budget');
    formData.append('reduction_percent', reductionPercent.toString());
    formData.append('user_id', 'default_user');

    try {
      const response = await fetch('http://localhost:8000/bill-handler/', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      setBudgetData(data.budget_data);
      setHasActiveSession(true);
      setChatMessages([{
        type: 'system',
        content: 'Budget analysis complete! You can now ask questions about your energy consumption and recommendations.'
      }]);
    } catch (error) {
      console.error('Error uploading bill:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = { type: 'user', content: currentMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      if (isBudgetMode && hasActiveSession) {
        // Budget mode with active session - use chat endpoint
        const formData = new FormData();
        formData.append('user_id', 'default_user');
        formData.append('message', currentMessage);

        const response = await fetch('http://localhost:8000/chat-reply/', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        
        if (data.error) {
          const errorMessage = { type: 'bot', content: `Error: ${data.error}` };
          setChatMessages(prev => [...prev, errorMessage]);
          return;
        }
        
        const botMessage = { type: 'bot', content: data.reply };
        setChatMessages(prev => [...prev, botMessage]);
      } else {
        // Default chat mode - simulate response (you can integrate with your AI service here)
        setTimeout(() => {
          const responses = [
            "That's a great question about energy efficiency! Here are some tips to reduce your energy consumption...",
            "To lower your carbon footprint, consider these strategies: LED bulbs can reduce lighting energy by 75%, proper insulation can save 15% on heating/cooling, and unplugging devices when not in use prevents phantom energy loss.",
            "Energy-efficient appliances can make a significant difference. Look for Energy Star certified products, which use 10-50% less energy than standard models.",
            "Smart home devices like programmable thermostats can automatically optimize your energy usage, potentially saving 10-23% on heating and cooling costs.",
            "Solar panels, while requiring initial investment, can reduce electricity bills by 70-90% and significantly lower your carbon footprint over time."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          const botMessage = { type: 'bot', content: randomResponse };
          setChatMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        }, 1000);
        return;
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { type: 'bot', content: `Sorry, I encountered an error: ${error.message}. Please try again.` };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = () => {
    setFile(null);
    setBudgetData(null);
    setChatMessages([]);
    setCurrentMessage('');
    setIsBudgetMode(false);
    setHasActiveSession(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Start fresh chat session
    setChatMessages([{
      type: 'system',
      content: 'Hi! I\'m your energy efficiency assistant. Ask me anything about saving energy, reducing carbon footprint, or sustainable living practices!'
    }]);
  };

  // Initialize chat on component mount
  React.useEffect(() => {
    if (chatMessages.length === 0 && !isBudgetMode) {
      setChatMessages([{
        type: 'system',
        content: 'Hi! I\'m your energy efficiency assistant. Ask me anything about saving energy, reducing carbon footprint, or sustainable living practices!'
      }]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">EcoSync Energy Assistant</h1>
          <p className="text-gray-600">Your personal energy efficiency and sustainability advisor</p>
        </div>

        {/* Mode Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1 flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="mode"
                checked={!isBudgetMode}
                onChange={() => handleModeChange(false)}
                className="mr-3"
              />
              <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Energy Chat</div>
                <div className="text-sm text-gray-600">Get instant advice on energy efficiency and sustainability</div>
              </div>
            </label>
            <label className="flex-1 flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="mode"
                checked={isBudgetMode}
                onChange={() => handleModeChange(true)}
                className="mr-3"
              />
              <Calculator className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-800">Budget Manager</div>
                <div className="text-sm text-gray-600">Upload your electricity bill for personalized analysis</div>
              </div>
            </label>
          </div>
        </div>

        {/* File Upload Section - Only shown in Budget Mode */}
        {isBudgetMode && !hasActiveSession && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* File Upload */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Your Electricity Bill
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Budget Settings */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carbon Reduction Target
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reduction Target: {reductionPercent}%
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={reductionPercent}
                      onChange={(e) => setReductionPercent(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5%</span>
                      <span>50%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Set your desired carbon footprint reduction goal to get personalized recommendations.
                  </p>
                </div>

                <button
                  onClick={handleSubmitBill}
                  disabled={!file || isLoading}
                  className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Analyzing Bill...' : 'Analyze Bill'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Budget Results - Only shown in Budget Mode with results */}
        {budgetData && isBudgetMode && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Current Carbon Footprint */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Calculator className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Current Footprint</h3>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {budgetData.original_credits} kg
                </div>
                <p className="text-gray-600">CO₂ emissions from your current usage</p>
                <p className="text-sm text-gray-500 mt-1">{budgetData.usage_kwh} kWh consumed</p>
              </div>

              {/* Target Carbon Budget */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Target Budget</h3>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {budgetData.target_credits} kg
                </div>
                <p className="text-gray-600">{budgetData.reduction_percent}% reduction goal</p>
              </div>

              {/* Savings Needed */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-8 w-8 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-800">Savings Needed</h3>
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {budgetData.savings_needed} kg
                </div>
                <p className="text-gray-600">CO₂ reduction to reach your goal</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">Personalized Recommendations</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {budgetData.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start">
                      <span className="inline-block w-6 h-6 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Chat Interface */}
        {hasActiveSession && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {isBudgetMode ? 'Discuss Your Energy Plan' : 'Energy Efficiency Chat'}
                </h3>
              </div>
              <button
                onClick={resetSession}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-1 rounded-md hover:bg-gray-100"
              >
                New Chat
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.type === 'system'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isBudgetMode 
                    ? "Ask about your recommendations, energy usage, or savings tips..." 
                    : "Ask me anything about energy efficiency, sustainability, or green living..."
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonBudget;