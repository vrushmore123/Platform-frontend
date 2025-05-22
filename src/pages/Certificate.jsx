import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const Certificate = ({ studentName, courseTitle, lessons }) => {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    if (completedLessons.length === lessons.length) {
      setShowCertificate(true);
    }
  }, [completedLessons, lessons]);

  const markLessonComplete = (lessonIndex) => {
    if (!completedLessons.includes(lessonIndex)) {
      setCompletedLessons([...completedLessons, lessonIndex]);
    }
  };

  const downloadCertificate = async () => {
    const cert = document.getElementById("certificate");
    const canvas = await html2canvas(cert);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${studentName}_Certificate.pdf`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Course Lessons</h2>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {lesson}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => markLessonComplete(index)}
              disabled={completedLessons.includes(index)}
            >
              {completedLessons.includes(index) ? "Completed" : "Mark Complete"}
            </button>
          </li>
        ))}
      </ul>

      {showCertificate && (
        <div
          id="certificate"
          style={{
            marginTop: "40px",
            border: "2px solid #333",
            padding: "40px",
            maxWidth: "800px",
            textAlign: "center",
            background: "#fffbe6",
          }}
        >
          <h1 style={{ color: "#1d4ed8" }}>Course Completion Certificate</h1>
          <p>This certifies that <strong>{studentName}</strong></p>
          <p>has successfully completed the course</p>
          <p><strong>{courseTitle}</strong></p>
          <p>Date: <span>{new Date().toLocaleDateString()}</span></p>
          <button
            style={{
              marginTop: "20px",
              background: "#4f46e5",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={downloadCertificate}
          >
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificate;
