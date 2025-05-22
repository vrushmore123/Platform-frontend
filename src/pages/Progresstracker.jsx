const ProgressTracker = ({ courses }) => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Your Learning Progress</h2>
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{course.title}</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };