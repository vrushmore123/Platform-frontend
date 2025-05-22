import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockFetchCourseById = async (id) => {
  // Replace this with your real API fetch
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        id,
        title: "Sample Course Title",
        description: "This is a sample course description.",
        category: "Development",
        thumbnail_image: "/full stack developer.jpeg",
        status: "draft",
        modules: [
          {
            id: "m1",
            title: "Module 1",
            description: "Intro module",
            lessons: [
              {
                id: "l1",
                title: "Lesson 1",
                video_url: "https://video.url/lesson1.mp4",
                resource_url: "https://resource.url/doc.pdf",
                duration: "10:00",
                summary: "Summary of lesson 1",
              },
            ],
            quiz: {
              title: "Quiz 1",
              questions: [
                {
                  question: "What is React?",
                  options: ["Library", "Framework", "Language", "Tool"],
                  correct_answer: "Library",
                },
              ],
            },
          },
        ],
      });
    }, 500)
  );
};

const mockSaveCourse = async (course) => {
  // Replace this with your real API save
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("Saved course:", course);
      resolve(true);
    }, 500)
  );
};

const CourseEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Course main info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [status, setStatus] = useState("draft");

  // Modules state: array of { id, title, description, lessons, quiz }
  const [modules, setModules] = useState([]);

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true);
        const course = await mockFetchCourseById(id);

        setTitle(course.title);
        setDescription(course.description);
        setCategory(course.category);
        setThumbnail(course.thumbnail_image);
        setStatus(course.status || "draft");
        setModules(course.modules || []);
      } catch (e) {
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  // Handlers for modules
  const addModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        title: "",
        description: "",
        lessons: [],
        quiz: { title: "", questions: [] },
      },
    ]);
  };

  const updateModule = (index, field, value) => {
    const newModules = [...modules];
    newModules[index][field] = value;
    setModules(newModules);
  };

  const removeModule = (index) => {
    const newModules = [...modules];
    newModules.splice(index, 1);
    setModules(newModules);
  };

  // Handlers for lessons inside modules
  const addLesson = (moduleIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.push({
      id: `l${Date.now()}`,
      title: "",
      video_url: "",
      resource_url: "",
      duration: "",
      summary: "",
    });
    setModules(newModules);
  };

  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons[lessonIndex][field] = value;
    setModules(newModules);
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setModules(newModules);
  };

  // Handlers for quiz questions
  const addQuizQuestion = (moduleIndex) => {
    const newModules = [...modules];
    if (!newModules[moduleIndex].quiz) {
      newModules[moduleIndex].quiz = { title: "", questions: [] };
    }
    newModules[moduleIndex].quiz.questions.push({
      question: "",
      options: ["", "", "", ""],
      correct_answer: "",
    });
    setModules(newModules);
  };

  const updateQuizQuestion = (moduleIndex, questionIndex, field, value) => {
    const newModules = [...modules];
    newModules[moduleIndex].quiz.questions[questionIndex][field] = value;
    setModules(newModules);
  };

  const updateQuizQuestionOption = (
    moduleIndex,
    questionIndex,
    optionIndex,
    value
  ) => {
    const newModules = [...modules];
    newModules[moduleIndex].quiz.questions[questionIndex].options[optionIndex] =
      value;
    setModules(newModules);
  };

  const removeQuizQuestion = (moduleIndex, questionIndex) => {
    const newModules = [...modules];
    newModules[moduleIndex].quiz.questions.splice(questionIndex, 1);
    setModules(newModules);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);
    setSaving(true);

    // Construct full course object to save
    const updatedCourse = {
      id,
      title,
      description,
      category,
      thumbnail_image: thumbnail,
      status,
      modules: modules.map((m) => ({
        title: m.title,
        description: m.description,
        lessons: m.lessons.map((l) => ({
          title: l.title,
          video_url: l.video_url,
          resource_url: l.resource_url,
          duration: l.duration,
          summary: l.summary,
        })),
        quiz:
          m.quiz && m.quiz.questions.length > 0
            ? {
                title: m.quiz.title || `Quiz for ${m.title}`,
                questions: m.quiz.questions.map((q) => ({
                  question: q.question,
                  options: q.options,
                  correct_answer: q.correct_answer,
                })),
              }
            : null,
      })),
    };

    try {
      await mockSaveCourse(updatedCourse);
      navigate("/courses");
    } catch {
      setError("Failed to save course.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/courses");
  };

  if (loading) return <p>Loading course data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Info */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="title">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
            disabled={saving}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="thumbnail">
            Thumbnail Image URL
          </label>
          <input
            id="thumbnail"
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          />
        </div>

        {thumbnail && (
          <div className="mt-4">
            <p className="font-semibold mb-1">Thumbnail Preview:</p>
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="w-full max-h-48 object-cover rounded"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <div>
          <label className="block font-semibold mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded px-3 py-2"
            disabled={saving}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        {/* Modules */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Modules</h2>
          <button
            type="button"
            onClick={addModule}
            className="mb-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={saving}
          >
            + Add Module
          </button>
          {modules.length === 0 && <p>No modules added yet.</p>}

          {modules.map((module, mIndex) => (
            <div
              key={module.id || mIndex}
              className="mb-6 p-4 border rounded space-y-4 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Module {mIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeModule(mIndex)}
                  className="text-red-600 hover:underline"
                  disabled={saving}
                >
                  Remove Module
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={module.title}
                  onChange={(e) =>
                    updateModule(mIndex, "title", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  value={module.description}
                  onChange={(e) =>
                    updateModule(mIndex, "description", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  disabled={saving}
                />
              </div>

              {/* Lessons */}
              <div>
                <h4 className="font-semibold mb-2">Lessons</h4>
                <button
                  type="button"
                  onClick={() => addLesson(mIndex)}
                  className="mb-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  disabled={saving}
                >
                  + Add Lesson
                </button>
                {module.lessons.length === 0 && <p>No lessons yet.</p>}
                {module.lessons.map((lesson, lIndex) => (
                  <div
                    key={lesson.id || lIndex}
                    className="mb-3 p-3 border rounded bg-white space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Lesson {lIndex + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeLesson(mIndex, lIndex)}
                        className="text-red-600 hover:underline"
                        disabled={saving}
                      >
                        Remove Lesson
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Title"
                      value={lesson.title}
                      onChange={(e) =>
                        updateLesson(mIndex, lIndex, "title", e.target.value)
                      }
                      className="w-full border rounded px-3 py-2"
                      disabled={saving}
                    />
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={lesson.video_url}
                      onChange={(e) =>
                        updateLesson(
                          mIndex,
                          lIndex,
                          "video_url",
                          e.target.value
                        )
                      }
                      className="w-full border rounded px-3 py-2"
                      disabled={saving}
                    />
                    <input
                      type="text"
                      placeholder="Resource URL"
                      value={lesson.resource_url}
                      onChange={(e) =>
                        updateLesson(
                          mIndex,
                          lIndex,
                          "resource_url",
                          e.target.value
                        )
                      }
                      className="w-full border rounded px-3 py-2"
                      disabled={saving}
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g. 10:00)"
                      value={lesson.duration}
                      onChange={(e) =>
                        updateLesson(mIndex, lIndex, "duration", e.target.value)
                      }
                      className="w-full border rounded px-3 py-2"
                      disabled={saving}
                    />
                    <textarea
                      placeholder="Summary"
                      value={lesson.summary}
                      onChange={(e) =>
                        updateLesson(mIndex, lIndex, "summary", e.target.value)
                      }
                      className="w-full border rounded px-3 py-2"
                      rows={2}
                      disabled={saving}
                    />
                  </div>
                ))}
              </div>

              {/* Quiz */}
              <div>
                <h4 className="font-semibold mb-2">Quiz</h4>
                <input
                  type="text"
                  placeholder="Quiz Title"
                  value={module.quiz?.title || ""}
                  onChange={(e) =>
                    updateModule(mIndex, "quiz", {
                      ...module.quiz,
                      title: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2 mb-2"
                  disabled={saving}
                />

                <button
                  type="button"
                  onClick={() => addQuizQuestion(mIndex)}
                  className="mb-2 px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  disabled={saving}
                >
                  + Add Question
                </button>

                {module.quiz?.questions.length === 0 && (
                  <p>No quiz questions yet.</p>
                )}

                {module.quiz?.questions.map((q, qIndex) => (
                  <div
                    key={qIndex}
                    className="mb-3 p-3 border rounded bg-white space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold">Question {qIndex + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeQuizQuestion(mIndex, qIndex)}
                        className="text-red-600 hover:underline"
                        disabled={saving}
                      >
                        Remove Question
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Question text"
                      value={q.question}
                      onChange={(e) =>
                        updateQuizQuestion(
                          mIndex,
                          qIndex,
                          "question",
                          e.target.value
                        )
                      }
                      className="w-full border rounded px-3 py-2"
                      disabled={saving}
                    />
                    <div>
                      {q.options.map((opt, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          placeholder={`Option ${optIndex + 1}`}
                          value={opt}
                          onChange={(e) =>
                            updateQuizQuestionOption(
                              mIndex,
                              qIndex,
                              optIndex,
                              e.target.value
                            )
                          }
                          className="w-full border rounded px-3 py-2 mt-1"
                          disabled={saving}
                        />
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Correct Answer"
                      value={q.correct_answer}
                      onChange={(e) =>
                        updateQuizQuestion(
                          mIndex,
                          qIndex,
                          "correct_answer",
                          e.target.value
                        )
                      }
                      className="w-full border rounded px-3 py-2 mt-1"
                      disabled={saving}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseEditPage;
