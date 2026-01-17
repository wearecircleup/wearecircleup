import { useState } from "react";
import Section from "../components/Section";
import Button from "../components/Button";
import { GitHubAuthService } from "../shared/utils/github";
import { presentationFormSchema } from "../shared/schemas/presentation.schema";

const Dashboard = ({ setCurrentPage }) => {
  const user = GitHubAuthService.getUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    numSlides: 10,
    theme: "modern",
    model: "gpt-4o",
    options: {
      includeSpeakerNotes: true,
      addReferences: false,
      tone: "professional"
    }
  });
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('options.')) {
      const optionKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        options: {
          ...prev.options,
          [optionKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const validated = presentationFormSchema.parse(formData);
      setErrors({});
      setIsGenerating(true);
      
      console.log("Generating presentation:", validated);
      
      setTimeout(() => {
        setIsGenerating(false);
        alert("Presentation generation started! You'll be notified when it's ready.");
      }, 2000);
      
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const handleLogout = () => {
    GitHubAuthService.logout();
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-n-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img src="./assets/grid.png" alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="absolute inset-0 opacity-20">
        <img src="./assets/hero/stars.svg" alt="" className="w-full h-full object-cover" />
      </div>

      <Section className="min-h-screen py-6 lg:py-10">
        <div className="container max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-n-1 mb-2">
                Create Presentation
              </h1>
              <p className="text-n-4">
                Welcome back, <span className="text-color-1">{user?.username || 'User'}</span>
              </p>
            </div>
            <Button onClick={handleLogout} white>
              Logout
            </Button>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="absolute -top-3 -left-6 w-full h-full bg-n-6/15 rounded-2xl transform rotate-2 shadow-lg hidden lg:block"></div>
            <div className="absolute -top-2 -left-3 w-full h-full bg-n-6/25 rounded-2xl transform rotate-1 shadow-lg hidden lg:block"></div>
            
            <div className="relative bg-n-7/90 backdrop-blur-sm border border-n-6/50 rounded-2xl p-6 lg:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title */}
                <div>
                  <label className="block text-n-1 font-medium mb-2">
                    Presentation Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Climate Action 2026"
                    className={`w-full bg-n-8/50 border ${errors.title ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-n-1 font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what your presentation should cover..."
                    rows="4"
                    className={`w-full bg-n-8/50 border ${errors.description ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 placeholder-n-4 focus:border-color-1 focus:outline-none transition-colors resize-none`}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Grid for smaller inputs */}
                <div className="grid md:grid-cols-2 gap-6">
                  
                  {/* Number of Slides */}
                  <div>
                    <label className="block text-n-1 font-medium mb-2">
                      Number of Slides *
                    </label>
                    <input
                      type="number"
                      name="numSlides"
                      value={formData.numSlides}
                      onChange={handleInputChange}
                      min="5"
                      max="50"
                      className={`w-full bg-n-8/50 border ${errors.numSlides ? 'border-red-500' : 'border-n-1/10'} rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors`}
                    />
                    {errors.numSlides && <p className="text-red-500 text-sm mt-1">{errors.numSlides}</p>}
                  </div>

                  {/* Theme */}
                  <div>
                    <label className="block text-n-1 font-medium mb-2">
                      Theme *
                    </label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors"
                    >
                      <option value="modern">Modern</option>
                      <option value="academic">Academic</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-n-1 font-medium mb-2">
                      AI Model *
                    </label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors"
                    >
                      <option value="gpt-4o">GPT-4o (Recommended)</option>
                      <option value="meta-llama/Llama-3.1-70B-Instruct">Llama 3.1 70B</option>
                      <option value="microsoft/Phi-3-medium-128k-instruct">Phi-3 Medium</option>
                    </select>
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-n-1 font-medium mb-2">
                      Tone
                    </label>
                    <select
                      name="options.tone"
                      value={formData.options.tone}
                      onChange={handleInputChange}
                      className="w-full bg-n-8/50 border border-n-1/10 rounded-xl py-3 lg:py-4 px-4 text-n-1 focus:border-color-1 focus:outline-none transition-colors"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="academic">Academic</option>
                    </select>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="block text-n-1 font-medium mb-2">
                    Additional Options
                  </label>
                  
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="options.includeSpeakerNotes"
                      checked={formData.options.includeSpeakerNotes}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-n-1/10 bg-n-8/50 text-color-1 focus:ring-color-1"
                    />
                    <span className="text-n-3">Include speaker notes</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="options.addReferences"
                      checked={formData.options.addReferences}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded border-n-1/10 bg-n-8/50 text-color-1 focus:ring-color-1"
                    />
                    <span className="text-n-3">Add references</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full"
                    white
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </span>
                    ) : (
                      'Generate Presentation'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};

export default Dashboard;
