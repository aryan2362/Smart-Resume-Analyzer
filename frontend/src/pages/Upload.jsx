import { useState } from "react";
import axios from "axios";
import "./Upload.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Please select a resume");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData
      );

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="title"><Smart></Smart> Resume Analyzer</h1>

      <p className="subtitle">
        Analyze your resume and improve your ATS score
      </p>

      <div className="upload-box">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="upload-btn"
          onClick={handleUpload}
        >
          Upload Resume
        </button>
      </div>
      <div className="status">
  {result.atsScore >= 80
    ? "🏆 Excellent Resume"
    : result.atsScore >= 60
    ? "👍 Good Resume"
    : "⚠ Needs Improvement"}
</div>

      {loading && (
        <div className="loading">
          Analyzing Resume...
        </div>
      )}

      {result && (
        <div className="result-card">

          <div className="score-section">
            <div className="score-text">
              ATS Score: {result.atsScore}/100
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${result.atsScore}%`,
                }}
              ></div>
            </div>

            <div className="status">
              {result.atsScore >= 80
                ? "🚀 Excellent Resume"
                : result.atsScore >= 60
                ? "👍 Good Resume"
                : "⚠️ Needs Improvement"}
            </div>
          </div>

          <div className="grid">

            <div className="card">
              <h3>✅ Matched Skills</h3>

              <ul>
                {result.matchedKeywords?.map(
                  (skill, index) => (
                    <li key={index}>{skill}</li>
                  )
                )}
              </ul>
            </div>

            <div className="card">
              <h3>❌ Missing Skills</h3>

              <ul>
                {result.missingKeywords?.map(
                  (skill, index) => (
                    <li key={index}>{skill}</li>
                  )
                )}
              </ul>
            </div>

            <div className="card">
              <h3>💡 Suggestions</h3>

              <ul>
                {result.suggestions?.map(
                  (item, index) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </div>

          </div>

          <div className="footer">
            Resume Analysis Completed Successfully
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;