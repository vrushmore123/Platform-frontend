import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiEye, FiUpload, FiUser, FiBook, FiBarChart2, FiFileText } from 'react-icons/fi';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState({
    draft: [],
    ongoing: [],
    published: []
  });
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: null,
    thumbnailPreview: '',
    modules: []
  });
  const [currentModule, setCurrentModule] = useState({
    title: '',
    description: '',
    lessons: [],
    quiz: null
  });
  const [currentLesson, setCurrentLesson] = useState({
    title: '',
    video: '',
    resource: '',
    duration: '',
    summary: ''
  });
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    enrolledStudents: [],
    activeStudents: 0
  });
  const [teacherProfile, setTeacherProfile] = useState({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    bio: 'Full Stack Developer with 10+ years of experience in web technologies',
    signature: null,
    signaturePreview: ''
  });

  // Load sample data on component mount
  useEffect(() => {
    // Sample courses data
    const sampleCourses = {
      draft: [
        {
          id: 'course1',
          title: 'Advanced React Patterns',
          description: 'Learn advanced React patterns and best practices',
          thumbnail: 'https://via.placeholder.com/300x200?text=Advanced+React',
          modules: []
        }
      ],
      ongoing: [
        {
          id: 'course2',
          title: 'Node.js Microservices',
          description: 'Building scalable microservices with Node.js',
          thumbnail: 'https://via.placeholder.com/300x200?text=Node+Microservices',
          modules: [],
          studentsEnrolled: 15,
          startDate: '2023-05-15',
          endDate: '2023-08-15'
        }
      ],
      published: [
        {
          id: 'course3',
          title: 'Full Stack Development Bootcamp',
          description: 'Complete guide to becoming a full stack developer',
          thumbnail: 'https://via.placeholder.com/300x200?text=Full+Stack+Bootcamp',
          modules: [
            {
              id: 'module1',
              title: 'Introduction to Full Stack Development',
              description: 'Learn the fundamentals of full stack development and web architecture',
              lessons: [
                { 
                  id: 'lesson1', 
                  title: 'What is Full Stack Development?', 
                  video: 'https://www.youtube.com/embed/Zftx68K-1D4', 
                  resource: '/resources/fullstack_intro.pdf', 
                  duration: '8:32',
                  summary: 'Development of both the front-end and back-end components of a web application.'     
                }
              ]
            }
          ],
          studentsEnrolled: 42,
          publishedDate: '2023-01-10',
          rating: 4.7
        }
      ]
    };

    // Sample stats
    const sampleStats = {
      totalCourses: 3,
      totalStudents: 57,
      enrolledStudents: [
        { id: 's1', name: 'John Doe', courses: ['Full Stack Development Bootcamp'] },
        { id: 's2', name: 'Jane Smith', courses: ['Full Stack Development Bootcamp', 'Node.js Microservices'] }
      ],
      activeStudents: 38
    };

    setCourses(sampleCourses);
    setStats(sampleStats);
  }, []);

  const handleAddCourse = () => {
    setShowAddCourseModal(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse({
          ...newCourse,
          thumbnail: file,
          thumbnailPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeacherProfile({
          ...teacherProfile,
          signature: file,
          signaturePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addModule = () => {
    if (currentModule.title.trim() === '') return;
    
    setNewCourse({
      ...newCourse,
      modules: [...newCourse.modules, currentModule]
    });
    
    setCurrentModule({
      title: '',
      description: '',
      lessons: [],
      quiz: null
    });
  };

  const addLesson = () => {
    if (currentLesson.title.trim() === '') return;
    
    setCurrentModule({
      ...currentModule,
      lessons: [...currentModule.lessons, currentLesson]
    });
    
    setCurrentLesson({
      title: '',
      video: '',
      resource: '',
      duration: '',
      summary: ''
    });
  };

  const addQuizQuestion = () => {
    if (currentQuizQuestion.question.trim() === '') return;
    
    const quiz = currentModule.quiz || {
      title: `${currentModule.title} Quiz`,
      questions: []
    };
    
    setCurrentModule({
      ...currentModule,
      quiz: {
        ...quiz,
        questions: [...quiz.questions, currentQuizQuestion]
      }
    });
    
    setCurrentQuizQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const submitCourse = () => {
    if (newCourse.title.trim() === '' || newCourse.modules.length === 0) return;
    
    const newCourseObj = {
      id: `course${courses.draft.length + courses.ongoing.length + courses.published.length + 1}`,
      title: newCourse.title,
      description: newCourse.description,
      thumbnail: newCourse.thumbnailPreview || 'https://via.placeholder.com/300x200?text=Course+Thumbnail',
      modules: newCourse.modules,
      createdAt: new Date().toISOString()
    };
    
    setCourses({
      ...courses,
      draft: [...courses.draft, newCourseObj]
    });
    
    setNewCourse({
      title: '',
      description: '',
      category: '',
      thumbnail: null,
      thumbnailPreview: '',
      modules: []
    });
    
    setShowAddCourseModal(false);
  };

  const publishCourse = (courseId) => {
    const courseToPublish = courses.draft.find(c => c.id === courseId);
    if (!courseToPublish) return;
    
    setCourses({
      draft: courses.draft.filter(c => c.id !== courseId),
      ongoing: [...courses.ongoing, {...courseToPublish, publishedDate: new Date().toISOString()}],
      published: courses.published
    });
  };

  const moveToDraft = (courseId, from) => {
    const courseToMove = courses[from].find(c => c.id === courseId);
    if (!courseToMove) return;
    
    setCourses({
      ...courses,
      [from]: courses[from].filter(c => c.id !== courseId),
      draft: [...courses.draft, {...courseToMove}]
    });
  };

  const deleteCourse = (courseId, from) => {
    setCourses({
      ...courses,
      [from]: courses[from].filter(c => c.id !== courseId)
    });
  };

  const updateProfile = () => {
    // In a real app, this would send to backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-4">
        <div className="flex items-center space-x-2 mb-8">
          <FiBook className="text-2xl" />
          <h1 className="text-xl font-bold">LMS Teacher</h1>
        </div>
        
        <nav>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 w-full p-3 rounded-lg mb-2 ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
          >
            <FiBarChart2 />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('draft')}
            className={`flex items-center space-x-2 w-full p-3 rounded-lg mb-2 ${activeTab === 'draft' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
          >
            <FiFileText />
            <span>Draft Courses</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 w-full p-3 rounded-lg mb-2 ${activeTab === 'profile' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
          >
            <FiUser />
            <span>Update Profile</span>
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'dashboard' && (
          <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, {teacherProfile.name}!</h1>
              <p className="text-gray-600">Here's what's happening with your courses today.</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 font-medium">Total Courses</h3>
                <p className="text-3xl font-bold text-indigo-600">{stats.totalCourses}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 font-medium">Total Students</h3>
                <p className="text-3xl font-bold text-indigo-600">{stats.totalStudents}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 font-medium">Active Students</h3>
                <p className="text-3xl font-bold text-indigo-600">{stats.activeStudents}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 font-medium">Avg. Rating</h3>
                <p className="text-3xl font-bold text-indigo-600">4.5/5</p>
              </div>
            </div>
            
            {/* Recent Enrollments */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Recent Enrollments</h2>
                <button className="text-indigo-600 hover:text-indigo-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Student</th>
                      <th className="text-left py-3 px-4">Course</th>
                      <th className="text-left py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.enrolledStudents.map((student, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4">{student.courses.join(', ')}</td>
                        <td className="py-3 px-4">2023-06-{10 + index}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Courses Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Your Courses</h2>
              <button 
                onClick={handleAddCourse}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <FiPlus />
                <span>Add Course</span>
              </button>
            </div>
            
            {/* Draft Courses */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Draft Courses</h3>
              {courses.draft.length === 0 ? (
                <p className="text-gray-500">No draft courses yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.draft.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => publishCourse(course.id)}
                            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                          >
                            Publish
                          </button>
                          <button className="p-2 text-gray-500 hover:text-indigo-600">
                            <FiEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Ongoing Courses */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Ongoing Courses</h3>
              {courses.ongoing.length === 0 ? (
                <p className="text-gray-500">No ongoing courses.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.ongoing.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                        <p className="text-sm text-gray-500 mb-4">{course.studentsEnrolled} students enrolled</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                            View
                          </button>
                          <button 
                            onClick={() => moveToDraft(course.id, 'ongoing')}
                            className="p-2 text-gray-500 hover:text-indigo-600"
                          >
                            <FiEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Published Courses */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Published Courses</h3>
              {courses.published.length === 0 ? (
                <p className="text-gray-500">No published courses yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.published.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                        <div className="flex items-center mb-2">
                          <div className="text-yellow-400">★★★★☆</div>
                          <span className="text-sm text-gray-500 ml-1">({course.rating})</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{course.studentsEnrolled} students enrolled</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                            View
                          </button>
                          <button 
                            onClick={() => moveToDraft(course.id, 'published')}
                            className="p-2 text-gray-500 hover:text-indigo-600"
                          >
                            <FiEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'draft' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Draft Courses</h1>
            {courses.draft.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500 mb-4">You don't have any draft courses yet.</p>
                <button 
                  onClick={handleAddCourse}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Create New Course
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.draft.map(course => (
                  <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => publishCourse(course.id)}
                          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                        >
                          Publish
                        </button>
                        <button className="p-2 text-gray-500 hover:text-indigo-600">
                          <FiEdit />
                        </button>
                        <button 
                          onClick={() => deleteCourse(course.id, 'draft')}
                          className="p-2 text-gray-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={teacherProfile.name}
                    onChange={(e) => setTeacherProfile({...teacherProfile, name: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={teacherProfile.email}
                    onChange={(e) => setTeacherProfile({...teacherProfile, email: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Department</label>
                  <input 
                    type="text" 
                    value={teacherProfile.department}
                    onChange={(e) => setTeacherProfile({...teacherProfile, department: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Signature</label>
                  <div className="flex items-center space-x-4">
                    {teacherProfile.signaturePreview ? (
                      <img src={teacherProfile.signaturePreview} alt="Signature" className="h-12 border" />
                    ) : (
                      <div className="h-12 w-32 border flex items-center justify-center text-gray-400">
                        No signature
                      </div>
                    )}
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded">
                      <FiUpload className="inline mr-2" />
                      Upload
                      <input type="file" className="hidden" onChange={handleSignatureUpload} accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Bio</label>
                <textarea 
                  value={teacherProfile.bio}
                  onChange={(e) => setTeacherProfile({...teacherProfile, bio: e.target.value})}
                  className="w-full p-2 border rounded h-32"
                />
              </div>
              <button 
                onClick={updateProfile}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Create New Course</h2>
                <button 
                  onClick={() => setShowAddCourseModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Course Title*</label>
                  <input 
                    type="text" 
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="e.g. Advanced JavaScript"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select 
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select a category</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="data">Data Science</option>
                    <option value="design">Design</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Description*</label>
                <textarea 
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="w-full p-2 border rounded h-24"
                  placeholder="Describe what students will learn in this course"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Thumbnail</label>
                <div className="flex items-center space-x-4">
                  {newCourse.thumbnailPreview ? (
                    <img src={newCourse.thumbnailPreview} alt="Course thumbnail" className="h-32 object-cover rounded" />
                  ) : (
                    <div className="h-32 w-48 border-2 border-dashed rounded flex items-center justify-center text-gray-400">
                      Thumbnail preview
                    </div>
                  )}
                  <div>
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded inline-flex items-center">
                      <FiUpload className="mr-2" />
                      Upload Image
                      <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">Recommended size: 1280x720px</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Modules</h3>
                
                {newCourse.modules.length > 0 && (
                  <div className="mb-6 border rounded-lg overflow-hidden">
                    {newCourse.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="border-b last:border-b-0">
                        <div className="p-4 bg-gray-50">
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                        {module.lessons.length > 0 && (
                          <div className="p-4 bg-white">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Lessons:</h5>
                            <ul className="space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="text-sm text-gray-600 flex items-center">
                                  <span className="w-6">{lessonIndex + 1}.</span>
                                  <span>{lesson.title}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {module.quiz && (
                          <div className="p-4 bg-white">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">Quiz: {module.quiz.title}</h5>
                            <p className="text-sm text-gray-600">{module.quiz.questions.length} questions</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-4">Add New Module</h4>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Module Title*</label>
                    <input 
                      type="text" 
                      value={currentModule.title}
                      onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
                      className="w-full p-2 border rounded"
                      placeholder="e.g. Introduction to React"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea 
                      value={currentModule.description}
                      onChange={(e) => setCurrentModule({...currentModule, description: e.target.value})}
                      className="w-full p-2 border rounded h-20"
                      placeholder="Describe what this module covers"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Add Lesson</h5>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Lesson Title*</label>
                        <input 
                          type="text" 
                          value={currentLesson.title}
                          onChange={(e) => setCurrentLesson({...currentLesson, title: e.target.value})}
                          className="w-full p-2 border rounded"
                          placeholder="e.g. What is React?"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-1">Video URL</label>
                          <input 
                            type="text" 
                            value={currentLesson.video}
                            onChange={(e) => setCurrentLesson({...currentLesson, video: e.target.value})}
                            className="w-full p-2 border rounded"
                            placeholder="YouTube or Vimeo URL"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Duration</label>
                          <input 
                            type="text" 
                            value={currentLesson.duration}
                            onChange={(e) => setCurrentLesson({...currentLesson, duration: e.target.value})}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. 10:30"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Resource URL</label>
                        <input 
                          type="text" 
                          value={currentLesson.resource}
                          onChange={(e) => setCurrentLesson({...currentLesson, resource: e.target.value})}
                          className="w-full p-2 border rounded"
                          placeholder="PDF or document URL"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Summary</label>
                        <textarea 
                          value={currentLesson.summary}
                          onChange={(e) => setCurrentLesson({...currentLesson, summary: e.target.value})}
                          className="w-full p-2 border rounded h-20"
                          placeholder="Brief summary of the lesson"
                        />
                      </div>
                      <button 
                        onClick={addLesson}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Add Lesson
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Add Quiz (Optional)</h5>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Question*</label>
                        <input 
                          type="text" 
                          value={currentQuizQuestion.question}
                          onChange={(e) => setCurrentQuizQuestion({...currentQuizQuestion, question: e.target.value})}
                          className="w-full p-2 border rounded"
                          placeholder="Enter the question"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Options*</label>
                        {currentQuizQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input 
                              type="radio" 
                              name="correctAnswer"
                              checked={currentQuizQuestion.correctAnswer === index}
                              onChange={() => setCurrentQuizQuestion({...currentQuizQuestion, correctAnswer: index})}
                              className="mr-2"
                            />
                            <input 
                              type="text" 
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...currentQuizQuestion.options];
                                newOptions[index] = e.target.value;
                                setCurrentQuizQuestion({...currentQuizQuestion, options: newOptions});
                              }}
                              className="w-full p-2 border rounded"
                              placeholder={`Option ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={addQuizQuestion}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={addModule}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add Module to Course
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={submitCourse}
                  disabled={!newCourse.title || newCourse.modules.length === 0}
                  className={`px-6 py-2 rounded-lg text-white ${!newCourse.title || newCourse.modules.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 transition'}`}
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;