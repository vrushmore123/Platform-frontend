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
      {/* Add Google Fonts link in your index.html or App.js */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&family=Montserrat:wght@400;600&display=swap"
        rel="stylesheet"
      />

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
            position: "relative",
            marginTop: "40px",
            padding: "60px",
            maxWidth: "1000px",
            minHeight: "700px",
            textAlign: "center",
            background:
              "linear-gradient(to bottom right, #fff9f0 0%, #fff 100%)",
            border: "40px solid #234",
            borderImage:
              "linear-gradient(45deg, #234, #437, #234) 1",
            boxShadow: "0 0 35px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-45deg)",
              fontSize: "120px",
              opacity: "0.03",
              fontFamily: "'Cinzel', serif",
              whiteSpace: "nowrap",
            }}
          >
            PRAKTIKLY
          </div>

          {/* Certificate Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              zIndex: "1",
            }}
          >
            {/* Header */}
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                color: "#234",
                marginBottom: "40px",
              }}
            >
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                }}
              >
                Certificate of Completion
              </h1>
              <div
                style={{
                  width: "100px",
                  height: "3px",
                  background:
                    "linear-gradient(90deg, transparent, #234, transparent)",
                  margin: "20px auto",
                }}
              />
            </div>

            {/* Main Text */}
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                marginBottom: "40px",
              }}
            >
              <p style={{ fontSize: "18px", color: "#666" }}>
                This is to certify that
              </p>
              <p
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "48px",
                  color: "#234",
                  margin: "20px 0",
                }}
              >
                {studentName}
              </p>
              <p style={{ fontSize: "18px", color: "#666" }}>
                has successfully completed the course
              </p>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  color: "#234",
                  margin: "20px 0",
                  fontFamily: "'Cinzel', serif",
                }}
              >
                {courseTitle}
              </p>
            </div>

            {/* Date and Signatures */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                marginTop: "60px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "200px",
                    borderBottom: "2px solid #234",
                    marginBottom: "10px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  Course Instructor
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "200px",
                    borderBottom: "2px solid #234",
                    marginBottom: "10px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  Program Director
                </p>
              </div>
            </div>

            {/* Certificate Details */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "12px",
                color: "#666",
              }}
            >
              <p>
                Certificate No:{" "}
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p>Date Issued: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Seal */}
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                right: "40px",
                width: "120px",
                height: "120px",
                border: "2px solid #234",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Cinzel', serif",
                fontSize: "14px",
                color: "#234",
                transform: "rotate(-15deg)",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                <div>VERIFIED</div>
                <div style={{ fontSize: "10px" }}>PRAKTIKLY</div>
              </div>
            </div>

            <button
              style={{
                position: "absolute",
                bottom: "-80px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#234",
                color: "white",
                padding: "12px 30px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "16px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => (e.target.style.background = "#345")}
              onMouseOut={(e) => (e.target.style.background = "#234")}
              onClick={downloadCertificate}
            >
              Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
